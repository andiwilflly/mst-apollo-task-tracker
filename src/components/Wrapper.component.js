import React from 'react';
// Apollo
import { Query } from 'react-apollo';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Wrapper extends React.Component {

	static defaultProps = {
		queryId: "" + Math.random()
	};


	componentDidMount() {
		if(!store.queries.get(this.props.queryId)) store.setQuery(this.props.queryId);
	}


	render() {
		//console.log(this.props.queryData, this.isDataLoaded(), '??');
		// Cache query
		// TODO: global store for wrappers query cache??
		// TODO: what with navigation?
		if(store.queries.get(this.props.queryId)) return this.props.children;

		// TODO: need to check fields here
		return (
			<Query query={this.props.query}>
				{({loading, error, data})=> {
					if (error || !data) return <p>Error in xxx</p>;

					return <p>Loading...</p>
				}}
			</Query>
		)
	}
}


export default Wrapper;
