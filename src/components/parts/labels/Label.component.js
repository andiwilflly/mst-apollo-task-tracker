import React from 'react';
// Styles
import "styles/labels/labels_list.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import LABEL_ALL_INFO_QUERY from "graphql/queries/labels/labelAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from 'components/parts/PreLoader.component';


@observer
class Label extends React.Component {


	get label() { return store.labels.all.get(this.props.labelId); };

	
	render() {
		return (
			<QueryLoader preLoader={<div className="labels_list_label"><PreLoader/></div>}
						 query={ LABEL_ALL_INFO_QUERY }
						 variables={{ id: this.props.labelId }}>
				{ this.label ?
					<div className="labels_list_label"
						 style={{ background: this.label.color }} />
					:
					<div className="labels_list_label"><PreLoader/></div>
				}
			</QueryLoader>

		)
	}
}


export default Label;
