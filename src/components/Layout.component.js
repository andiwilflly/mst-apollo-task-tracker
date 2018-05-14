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


	render() {
		return (
			<div>
				<Header />
				<hr/>
				{ store.user ?
					<Wrapper query={ GET_USER_INFO_QUERY }
							 queryId={ `getUserInfo_${store.user.id}` }
							 variables={{ id: store.user.id }}>
						{ this.props.children }
					</Wrapper>
					:
					this.props.children
				}
				<hr/>
				<Footer />
			</div>
		)
	}
}

export default Layout
