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
		console.log(this.board, "label", label);
	};


	render() {
		return (
			<div>
				<p>Filter by labels:</p>
				<AllLabels onLabelClick={ this.onLabelClick } />
				<hr/>
				<br/>
				<br/>
			</div>
		)
	}
}


export default BoardFilters;
