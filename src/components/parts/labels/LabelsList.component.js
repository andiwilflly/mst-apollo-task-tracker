import React from 'react';
// Styles
import "styles/labels/labels_list.css";
// MobX
import { values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import ALL_LABELS_QUERY from "graphql/queries/labels/allLabels.query";
// Components
import QueryLoader from "components/QueryLoader.component";


@observer
class LabelsList extends React.Component {


	get labels() { return values(store.labels.all); };


	addLabelToTask(label) {
		console.log("add", label);
	}

	
	render() {
		return (
			<QueryLoader query={ ALL_LABELS_QUERY }>
				<ul className="labels_list">
					{ this.labels.map((label)=> {
						return (
							<li key={label.id}
								onClick={ ()=> this.addLabelToTask(label) }
								className="labels_list_label"
								style={{ background: label.color }} />
						);
					}) }
				</ul>
			</QueryLoader>
		)
	}
}


export default LabelsList;
