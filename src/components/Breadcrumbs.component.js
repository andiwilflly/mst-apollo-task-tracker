import React from 'react';
import { withRouter, Link } from "react-router-dom";
// Styles
import "styles/breadcrumbs.css";
// MobX
import { observer } from 'mobx-react';


@withRouter
@observer
class Breadcrumbs extends React.Component {


	get breadcrumbs() {
		let urls = this.props.match.url === "/" ? [""] : this.props.match.url.split('/');
		return urls.reduce(function(result, url, index) {
			result[index] = ((result[index-1] || "") + url + "/");
			return result;
		}, []).map((url)=> url === "/" ? url : url.replace(/.$/,""));
	};


	render() {
		return (
			<ul className="breadcrumbs">
				{ this.breadcrumbs.map((url, index)=> {
					return (
						<li key={url}>
							{ this.breadcrumbs.length-1 === index ?
								<span>{ url }</span>
								:
								<Link to={url}>{url}</Link>
							}

						</li>
					);
				}) }
			</ul>
		)
	}
}

export default Breadcrumbs
