import React from 'react';
// Components
import Header from "components/Header.component";
import Footer from "components/Footer.component";


class Layout extends React.Component {

	render() {
		return (
			<div>
				<Header />
				{ this.props.children }
				<Footer />
			</div>
		)
	}
}

export default Layout
