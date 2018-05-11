import { print, parse } from 'graphql'
import React from 'react'
// import PropTypes from "prop-types";
import { Query } from 'react-apollo'
// Store
// import store from "store";

class Wrapper extends React.Component {
  render() {
    //console.log(this.props.queryData, this.isDataLoaded(), '??');
    // Cache query
    // TODO: global store for wrappers query cache??
    // TODO: what with navigation?
    //if(store.queries.get(this.props.queryId)) return this.props.children;

    // TODO: need to check fields here
    return (
      <Query query={this.props.query}>
        {({ loading, error, data }) => {
          console.log('====> ', loading)
          if (error || !data) return <p>Error in xxx</p>

          // store.setQuery(this.props.queryId);
          return <p>Loading...</p>
        }}
      </Query>
    )
  }
}

export default Wrapper
