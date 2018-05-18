import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import LIST_ALL_INFO_QUERY from "graphql/queries/lists/listAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
// Components
import List from 'components/parts/lists/List.component'


@observer
class ListsPageContent extends React.Component {


    get board() { return store.boards.all.get(this.props.boardId); };


    render() {
        return (
            <div>
                { this.board.listIds.map((listId)=> {
                    return (
                        <QueryLoader query={ LIST_ALL_INFO_QUERY }
                                     key={listId}
                                     variables={{ id: listId }}>
                            <List listId={ listId } />
                        </QueryLoader>
                    );
                }) }
            </div>
        )
    }
}


export default ListsPageContent;