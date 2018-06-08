import { fromEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as bcrypt from 'bcryptjs'
import * as validator from 'validator'

interface User {
  id: string
}


const SALT_ROUNDS = 10;

export default async (event) => {

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const {
        email,
        password,
        avatar,
        name,
        phone } = event.data;

    if (!validator.isEmail(email)) {
      return { error: 'Not a valid email' }
    }

    // check if user exists already
    const userExists: boolean = await getUser(api, email)
      .then(r => r.User !== null);
    if (userExists) {
      return { error: 'Email already in use' }
    }

    // create password hash
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    // create new user
    const userId = await createGraphcoolUser(api, email, hash, avatar, name, phone);

    // generate node token for new User node
    const token = await graphcool.generateNodeToken(userId, 'User');

    return { data: { id: userId, token } }
  } catch (e) {
    return { error: 'An unexpected error occured during signup.' }
  }
}

async function getUser(api: GraphQLClient, email: string) {
  const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id
      }
    }
  `;

  const variables = {
    email,
  };

  return api.request<{ User }>(query, variables)
}

async function createGraphcoolUser(api: GraphQLClient, email, password, avatar, name, phone) {
  const mutation = `
    mutation createGraphcoolUser($email: String!, $password: String!, $avatar: String, $name: String, $phone: String) {
      createUser(
        email: $email,
        password: $password,
        avatar: $avatar,
        name: $name,
        phone: $phone
      ) {
        id
      }
    }
  `;

  const variables = {
    email,
    password,
    avatar,
    name,
    phone,
  };

  return api.request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}
