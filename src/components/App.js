import React from 'react';
// Store
import store from "store";
// Routes
import Routes from "components/Routes";


class App extends React.Component {


	componentDidMount() {
		store.setOnAuthStateChangedListener();
	}


	render() {
		return (
			<div className="pt-dark">
				<Routes />
			</div>
		)
	}
}

export default App
