import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/boards/board.css";
// MobX
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import BOARD_SHORT_INFO_QUERY from "graphql/queries/boards/boardShortInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


@observer
class BoardsShortInfoList extends React.Component {


	@observable isLoading = false;


	@computed get board() { return store.boards.all.get(this.props.boardId); };


	deleteBoard = async ()=> {
		this.isLoading = true;
		await store.boards.deleteMutation(this.props.boardId);
		this.isLoading = false;
	};


	render() {
		return (
			<QueryLoader query={ BOARD_SHORT_INFO_QUERY }
						 preLoader={ <div className="boards_list_item"><PreLoader /></div>}
						 variables={{ id: this.props.boardId }}>
				{ this.board ?
					<div className="boards_list_item">
						<Link to={ `/boards/${this.props.boardId}`}>{ this.board.name }</Link>
						<p>{ this.board.description }</p>
						<button onClick={ this.deleteBoard }
								disabled={ this.isLoading }>{
							this.isLoading ?
								<PreLoader/>
								:
								'Delete board'
						}</button>
					</div>
					:
					<div className="boards_list_item"><PreLoader /></div>
				}
			</QueryLoader>

		);
	}
}


export default BoardsShortInfoList;
