import React from 'react';
import { DropTarget } from 'react-drag-drop-container';
// Styles
import "styles/lists/list.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import TASK_ALL_INFO_QUERY from "graphql/queries/tasks/taskAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from 'components/parts/PreLoader.component';
import Task from 'components/parts/tasks/Task.component';


@observer
class List extends React.Component {

    @observable isLoading = false;


    get list() { return store.lists.all.get(this.props.listId); };


	creteTask = async ()=> {
		store.modal.open("CreateTask", {
			authorId: store.user.id,
			boardId: this.list.boardId,
			listId: this.props.listId
		});
		return;

    	this.isLoading = true;
        await store.tasks.createMutation({
			authorId: store.user.id,
			boardId: this.list.boardId,
			listId: this.props.listId,
			title: "Test Task title",
			description: "decription of the task"
		});
		this.isLoading = false;
	};


	handleDrop = (e)=> {
		this.findAncestor(e.target, "list").style.background = "white";

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
        if(!this.list) return <h3>No list { this.props.listId }</h3>;

        return (
            <div className="list">
				<DropTarget targetKey="task"
							onDragEnter={ (e)=> this.findAncestor(e.target, "list").style.background = "lightgreen" }
							onDragLeave={ (e)=> Array.prototype.map.call(document.getElementsByClassName('list'), (el)=> el.style.background = "white") }
							onHit={ this.handleDrop }>
					<div>
						<h3>{ this.list.name }</h3>
						<button onClick={ this.creteTask }
								disabled={ this.isLoading }>{
							this.isLoading ?
								<PreLoader/>
								:
								'Create task'
						}</button>

						<br/>
						{ this.list.taskIds.map((taskId)=> {
							return (
								<QueryLoader query={TASK_ALL_INFO_QUERY}
											 key={taskId}
											 preLoader={<div className="task"><PreLoader/></div>}
											 variables={{id: taskId}}>
									<Task taskId={taskId} />
								</QueryLoader>
							);
						}) }
					</div>
				</DropTarget>
            </div>
        )
    }
}


export default List;
