import React from 'react';
// Routes
import Router from "components/Router";
// Apollo
import { ApolloProvider } from 'react-apollo';
// GraphQL
import client from "graphql/client";
import LOGGED_IN_USER_QUERY from "graphql/queries/loggedInUser.query";
// Components
import QueryLoader from "components/QueryLoader.component";


class App extends React.Component {

	render() {
		return (
			<ApolloProvider client={client}>
				<QueryLoader query={ LOGGED_IN_USER_QUERY }>
					<Router />
				</QueryLoader>
			</ApolloProvider>
		)
	}
}

export default App
