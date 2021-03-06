import React from 'react';
import { DropTarget } from 'react-drag-drop-container';
// Styles
import "styles/lists/list.css";
// MobX
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import ListTasks from 'components/parts/tasks/ListTasks.component';


@observer
class List extends React.Component {

    @observable isLoading = false;


    @computed get list() { return store.lists.all.get(this.props.listId); };


	creteTask = async ()=> {
		store.modal.open("CreateTask", {
			authorId: store.authorizedUser.id,
			boardId: this.list.boardId,
			listId: this.props.listId
		});
	};


	handleDrop = (e)=> {
		this.findAncestor(e.target, "list").style.background = "lightgray";

		if(e.dragData.listId === this.list.id) return;

		const dragFromList = store.lists.all.get(e.dragData.listId);

		// Optimistic updates
		dragFromList.removeTaskId(e.dragData.taskId);
		this.list.addTaskId(e.dragData.taskId);

		store.tasks.all.get(e.dragData.taskId).updateMutation({
			id: e.dragData.taskId,
			listId: this.list.id
		});
	};


	findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls)) {}
		return el;
	}


    render() {
        return (
            <div className="list">
				<DropTarget targetKey="task"
							onDragEnter={ (e)=> this.findAncestor(e.target, "list").style.background = "lightgreen" }
							onDragLeave={ (e)=> Array.prototype.map.call(document.getElementsByClassName('list'), (el)=> el.style.background = "lightgray") }
							onHit={ this.handleDrop }>
					<div>
						<h3>{ this.list.name }</h3>

						<button onClick={ this.creteTask }>
							Create task
						</button>

						<ListTasks listId={ this.list.id }/>
					</div>
				</DropTarget>
            </div>
        )
    }
}


export default List;
