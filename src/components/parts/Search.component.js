import React from 'react';
// Styles
import "styles/search.css";
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Sore
import store from "store";


@observer
class Search extends React.Component {


	@observable search = {
		text: "",
		byTasks: true,
		byLists: false,
		results: []
	};


	setSearchText = (e)=> {
		this.search.text = e.currentTarget.value;
		this.runSearch();
	};

	setSearchBy = (type)=> {
		this.search[type] = !this.search[type];
		this.runSearch();
	};


	runSearch() {
		let results = [];
		if(this.search.byTasks) results = [ ...results, ...store.tasks.search(this.search.text)];

		this.search.results = results;
	};


	renderSearchResult(result) {
		switch(result.__type) {
			case "Task":
				return this.renderTask(result);
				break;
			default:
				return (
					<p>default result</p>
				);
		}
	}


	renderTask(task) {
		return (
			<div className="task cf">
				<h3 className="task_title">{ task.title }</h3>
				{ task.description }<br/>
				<p style={{ fontSize: 10 }}>listId: { task.listId }</p>
			</div>
		);
	}


	render() {
		return (
			<div className="search cf">
				<div className="search_input">
					<input type="text"
						   value={ this.search.text }
						   onChange={ this.setSearchText } />
					<label className="search_checkbox cf">
						<input type="checkbox"
							   checked={ this.search.byTasks }
							   onChange={ ()=> this.setSearchBy('byTasks') } />
						<span>search by tasks</span>
					</label>
					<label className="search_checkbox cf">
						<input type="checkbox"
							   checked={ this.search.byLists }
							   onChange={ ()=> this.setSearchBy('byLists') } />
						<span>search by lists</span>
					</label>
				</div>

				{ this.search.results.length ?
					<div className="search_results cf">
						{ this.search.results.map((result)=> {
							return (
								<div key={result.id} className="search_results_item">
									{ this.renderSearchResult(result) }
								</div>
							);
						}) }
					</div>
					: null }
			</div>
		)
	}
}

export default Search
