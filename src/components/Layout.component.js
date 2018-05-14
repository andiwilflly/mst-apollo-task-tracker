import React from 'react';
// MobX
import { observer } from "mobx-react";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Store
import store from "store";
// Components
import Wrapper from "components/Wrapper.component";
import Header from "components/Header.component";
import Footer from "components/Footer.component";


@observer
class Layout extends React.Component {


	renderContent() {
		return (
			<div>
				<Header />
				<hr/>
				{ this.props.children }
				<hr/>
				<Footer />
			</div>
		);
	}


	render() {
		return (
			<div>
				{ store.user ?
					<Wrapper query={ GET_USER_INFO_QUERY }
							 variables={{ id: store.user.id }}>
						{ this.renderContent() }
					</Wrapper>
					:
					this.renderContent()
				}
			</div>
		)
	}
}

export default Layout
