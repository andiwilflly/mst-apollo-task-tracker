import React from 'react';
// Styles
import "styles/boards/board.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class BoardFilters extends React.Component {


	get board() { return store.boards.all.get(this.props.boardId); };


	onLabelClick = (label)=> {
		store.filters.setFilter("byLabels", label.color);
	};


	render() {
		return (
			<div>
				{ store.filters.byLabels.length ?
					<p>Filtered by labels:</p>
					:
					null
				}

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
			</div>
		)
	}
}


export default BoardFilters;
