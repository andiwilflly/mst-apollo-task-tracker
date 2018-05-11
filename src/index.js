import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Pages
import HomePage from "pages/HomePage.component";


ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={HomePage} />
      </div>
    </Router>,
  document.getElementById('root')
);
