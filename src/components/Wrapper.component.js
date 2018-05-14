import React from 'react';
// GraphQl
import client from "graphql/client";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Wrapper extends React.Component {

	static defaultProps = {
		queryId: `queryId_${Math.random()}`
	};


	componentDidMount() {
		client.query({
			query: this.props.query
		}).catch((e)=> {}).finally(e => {
			store.setQuery(this.props.queryId);
		})
	}


	render() {
		if(store.queries.get(this.props.queryId)) return this.props.children;

		// TODO: need to check fields here
		return (
			<div>Loading...</div>
		)
	}
}


export default Wrapper;
