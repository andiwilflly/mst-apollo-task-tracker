import React from 'react';
// Routes
import Router from "components/Router";
// Apollo
import { ApolloProvider } from 'react-apollo';
// GraphQL
import client from "graphql/client";
import LOGGED_IN_USER_QUERY from "graphql/queries/loggedInUser.query";
// Components
import Wrapper from "components/Wrapper.component";


class App extends React.Component {

	render() {
		return (
			<ApolloProvider client={client}>
				<Wrapper query={ LOGGED_IN_USER_QUERY }>
					<Router />
				</Wrapper>
			</ApolloProvider>
		)
	}
}

export default App
