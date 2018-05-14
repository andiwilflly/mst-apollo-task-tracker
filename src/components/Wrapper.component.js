import React from 'react';
// GraphQl
import client from "graphql/client";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import PreLoader from "components/parts/PreLoader.component";


@observer
class Wrapper extends React.Component {

	static defaultProps = {
		variables: {}
	};


	@observable isLoaded = false;


	componentDidMount() {
		if(!store.queries.get(this.props.queryId)) {
			client.query({
				query: this.props.query,
				variables: this.props.variables
			}).catch((e)=> {}).finally(e => {
				if(this.props.queryId) store.setQuery(this.props.queryId);
				this.isLoaded = true;
			})
		} else {
			console.log("cached", this.props.queryId);
		}
	}


	render() {
		if(!this.props.queryId && this.isLoaded) return this.props.children; // For no cached queries
		if(store.queries.get(this.props.queryId)) return this.props.children;

		return (
			<PreLoader />
		)
	}
}


export default Wrapper;
