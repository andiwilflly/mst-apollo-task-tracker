import React from 'react';
// Styles
import "styles/layout.css";
// MobX
import { observer } from "mobx-react";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Store
import store from "store";
// Components
import QueryLoader from "components/QueryLoader.component";
import Header from "components/Header.component";
import Breadcrumbs from "components/Breadcrumbs.component";
import Sidebar from "components/Sidebar.component";
import Footer from "components/Footer.component";


@observer
class Layout extends React.Component {


	renderContent() {
		return (
			<div>
				<Header />
				<Breadcrumbs />
				<div className="wrapper cf">
					<div style={{ float: "left", width: 'calc(100% - 300px)' }}>
						{ this.props.children }
					</div>
					<Sidebar />
				</div>
				<Footer />
			</div>
		);
	}


	render() {
		return (
			<div>
				{ store.user ?
					<QueryLoader query={ GET_USER_INFO_QUERY }
								 fetchPolicy="network-only"
								 variables={{ id: store.user.id }}>
						{ this.renderContent() }
					</QueryLoader>
					:
					this.renderContent()
				}
			</div>
		)
	}
}

export default Layout
