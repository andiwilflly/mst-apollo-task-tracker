import React from 'react';
// Styles
import "styles/boards/board.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import AllLabels from "components/parts/labels/AllLabels.component";


@observer
class BoardFilters extends React.Component {


	get board() { return store.boards.all.get(this.props.boardId); };


	onLabelClick = (label)=> {
		store.filters.setFilter("byLabels", label.color);
	};


	render() {
		return (
			<div>
				<p>All labels:</p>
				<AllLabels onLabelClick={ this.onLabelClick } />
				<p>Filtered by labels:</p>
				<div className="labels_list">
					{ store.filters.byLabels.map((labelColor)=> {
						return (
							<div key={labelColor}
								 className="labels_list_label"
								 onClick={ ()=> store.filters.resetFilter("byLabels", labelColor) }
								 style={{ background: labelColor }} />
						);
					}) }
				</div>
				<hr/>
				<br/>
				<br/>
			</div>
		)
	}
}


export default BoardFilters;