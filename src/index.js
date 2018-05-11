import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Apollo
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjh1v6rdw1kmk0171da10ighp'
})

const link = new BatchHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjgqjtgq02uyn01163ejukkfn',
  batchInterval: 1000,
  fetch: async (url, request) => {
    return window
      .fetch(url, request)
      .then(response => response.json())
      .then(response => {
        console.log(response, 42)
      })
  },
  batchKey: str => {
    console.log(str, '????')
    return str.operationName
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={ListPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/post/:id' component={DetailPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
