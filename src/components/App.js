import React from 'react';
// Routes
import Router from "components/Router";
// Apollo
import { ApolloProvider } from 'react-apollo';
// GraphQL
import client from "graphql/client";


class App extends React.Component {


	render() {
		return (
			<ApolloProvider client={client}>
				<div>
					<Router />
				</div>
			</ApolloProvider>
		)
	}
}

export default App
