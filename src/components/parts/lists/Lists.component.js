import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Lists extends React.Component {

    get lists() { return store.lists.all.get(this.props.listId); };


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


export default Lists;
