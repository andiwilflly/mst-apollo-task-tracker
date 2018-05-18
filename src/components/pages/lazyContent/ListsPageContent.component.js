import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import CreateList from "components/parts/lists/CreateList.component"


@observer
class ListsPage extends React.Component {

    // static props = {
    //   boardId: string
    // };


    static permissions = {
        needAuth: true
    };


    get board() {
        return store.boards.all.get(this.props.boardId)
    }


    render() {
        return (
            <div>
                <ul>
                    <p>lists</p>
                    { this.board.lists.map(({ id:listId })=> {
                        return (
                            <li key={listId}>
                                <Link to={ `/lists/${listId}`}>{ listId }</Link>
                                <button onClick={ ()=> store.lists.deleteList(listId) }>Delete</button>
                            </li>
                        );
                    }) }
                </ul>

                <hr/>
                <CreateList boardId={ this.props.boardId } />
            </div>
        )
    }
}


export default ListsPage;
