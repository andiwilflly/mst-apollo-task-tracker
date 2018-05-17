import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class List extends React.Component {

    get list() { return store.lists.all.get(this.props.listId); };


    render() {
        console.log("render", this.list);
        return (
            <div>
                <hr/>
                <br/>
                id: { this.list.id } <br/>
                name: { this.list.name }<br/>

            </div>
        )
    }
}


export default List;
