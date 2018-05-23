import React from 'react';
import { Query } from "react-apollo";
// Components
import PreLoader from "components/parts/PreLoader.component";


class QueryLoader extends React.Component {

	render() {
		return (
			<Query { ...this.props }>
				{({ loading, error, data })=> {
					if(loading) return this.props.preLoader || <PreLoader />;
					return this.props.children;
				}}
			</Query>
		);
	}
}


export default QueryLoader;
