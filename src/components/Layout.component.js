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
import ModalContent from "components/parts/ModalContent.component";
import Footer from "components/Footer.component";
import PreLoader from "components/parts/PreLoader.component";


@observer
class Layout extends React.Component {


	renderContent() {
		return (
			<div>
				<Header />
				<Breadcrumbs />
				<div className="wrapper">
					{ this.props.children }
					{/*<Sidebar />*/}
				</div>
				<Footer />
				<ModalContent />
			</div>
		);
	}


	render() {
		return (
			<div>
				{ store.authorizedUser ?
					<QueryLoader query={ GET_USER_INFO_QUERY }
								 fetchPolicy="network-only"
								 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
								 variables={{ id: store.authorizedUser.id }}>
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
