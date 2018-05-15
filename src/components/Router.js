import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// MobX
import { observer } from 'mobx-react';
// Pages
import Layout from "components/Layout.component";
import HomePage from "components/pages/HomePage.component";
import LoginPage from "components/pages/LoginPage.component";
import RegistrationPage from "components/pages/RegistrationPage.component";
import Page404 from "components/pages/Page404.component";
// Store
import store from 'store';


const RouteComponent = ({ component: Component, ...rest })=> {
	// Need needAuth case
	if(Component.permissions.needAuth === true && !store.user) return <Redirect to={{ pathname: Component.permissions.redirectPath }} />;

	if(Component.permissions.notForAuth === true && store.user) return <Redirect to={{ pathname: Component.permissions.redirectPath }} />;

	// Default case
	return (
		<Route { ...rest } render={ (props)=>
			React.createElement(Layout, props, React.createElement(Component, props))
		} />
	);
};


// @SOURCE: https://reacttraining.com/react-router/
// TODO: https://reacttraining.com/react-router/web/example/auth-workflow
const Routes = ()=> {
	return (
		<Router>
			<Switch>
				<RouteComponent exact path="/" component={HomePage} />
				<RouteComponent exact path="/login" component={LoginPage} />
				<RouteComponent exact path="/registration" component={RegistrationPage} />
				<RouteComponent component={Page404} />
			</Switch>

		</Router>
	);
}

;

export default observer(Routes);