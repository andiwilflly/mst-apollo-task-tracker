import React from 'react';
// Styles
import "styles/labels/labels_list.css";
// MobX
import { values, observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import ALL_LABELS_QUERY from "graphql/queries/labels/allLabels.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from 'components/parts/PreLoader.component';


@observer
class AllLabels extends React.Component {


	@observable isLoading = false;

	@observable newLabel = {
		color: ""
	};


	get labels() { return values(store.labels.all); };


	createLabel = async ()=> {
		if(this.labels.map(label=> label.color).includes(this.newLabel.color)) return false;
		this.isLoading = true;
		await store.labels.createMutation(this.newLabel);
		this.isLoading = false;
		this.newLabel.color = "";
	};


	onLabelClick = (label)=> {
		this.props.onLabelClick && this.props.onLabelClick(label);
	};


	render() {
		return (
			<QueryLoader query={ ALL_LABELS_QUERY }>

				<h3>Labels</h3>

				<div>
					<div className="cf" style={{ marginBottom: "5px" }}>
						<input type="text" value={ this.newLabel.color}
							   style={{ width: 100, minWidth: 100, float: "left" }}
							   onChange={ (e)=> this.newLabel.color = e.currentTarget.value }
							   placeholder="Label color"/>
						<div className="labels_list_label" style={{ background: this.newLabel.color }}/>
					</div>
					<button onClick={ this.createLabel }
							disabled={ this.isLoading || !this.newLabel.color }>{
						this.isLoading ?
							<PreLoader/>
							:
							'Crete new label'
					}</button>
				</div>

				<ul className="labels_list">
					{ this.labels.map((label)=> {
						return (
							<li key={label.id}
								onClick={ ()=> this.onLabelClick(label) }
								className="labels_list_label"
								style={{ background: label.color }} />
						);
					}) }
				</ul>
			</QueryLoader>
		)
	}
}


export default AllLabels;
