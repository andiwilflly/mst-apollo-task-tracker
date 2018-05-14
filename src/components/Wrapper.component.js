import React from 'react';
// GraphQl
import client from "graphql/client";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import PreLoader from "components/parts/PreLoader.component";


@observer
class Wrapper extends React.Component {

	static defaultProps = {
		queryId: `queryId_${Math.random()}`,
		variables: {}
	};


	componentDidMount() {
		client.query({
			query: this.props.query,
			variables: this.props.variables
		}).catch((e)=> {}).finally(e => {
			store.setQuery(this.props.queryId);
		})
	}


	render() {
		if(store.queries.get(this.props.queryId)) return this.props.children;

		return (
			<PreLoader />
		)
	}
}


export default Wrapper;
