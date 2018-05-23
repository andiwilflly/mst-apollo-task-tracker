import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
// Styles
import "styles/tasks/task.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// GraphQL
import LABEL_ALL_INFO_QUERY from "graphql/queries/labels/labelAllInfo.query";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import Label from 'components/parts/labels/Label.component';
// Components
import QueryLoader from "components/QueryLoader.component";

@observer
class Task extends React.Component {

	@observable isLoading = false;


	get task() { return store.tasks.all.get(this.props.taskId); };


	deleteTask = async ()=> {
		this.isLoading = true;
		await store.tasks.deleteMutation({
			taskId: this.task.id,
			userId: this.task.authorId,
			boardId: this.task.boardId,
			listId: this.task.listId
		});
		this.isLoading = false;
	};


	render() {
		if(!this.task) return <div className="task"><PreLoader /></div>;

		return (
			<DragDropContainer targetKey="task"
							   returnToBase={true}
							   dragData={{
							   	  taskId: this.task.id,
								  listId: this.task.listId
							   }}>
				<div className="task cf">
					<h3 className="task_title">{  this.task.title }</h3>
					{ this.task.description }<br/>
					<p style={{ fontSize: 10 }}>listId: { this.task.listId }</p>

					<ul className="labels_list">
						{ this.task.labelsIds.map((labelId)=> {
							return (
								<QueryLoader key={labelId}
											 query={ LABEL_ALL_INFO_QUERY }
											 variables={{ id: labelId }}>
									<Label labelId={ labelId } />
								</QueryLoader>
							)
						}) }
					</ul>

					<button className="task_delete_button"
							onClick={ this.deleteTask }
							disabled={ this.isLoading }>{
						this.isLoading ?
							<PreLoader/>
							:
							'Delete task'
					}</button>
				</div>
			</DragDropContainer>
		)
	}
}


export default Task;
