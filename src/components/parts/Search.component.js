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
		by: {
			tasks: true,
			users: false,
			comments: false
		},
		showResults: false,
		results: []
	};


	setSearchText = (e)=> {
		this.search.text = e.currentTarget.value;
		this.runSearch();
	};

	setSearchBy = (type)=> {
		this.search.by[type] = !this.search.by[type];
		this.runSearch();
	};


	runSearch() {
		let results = [];
		this.search.showResults = true;
		if(this.search.by.tasks) results = [ ...results, ...store.tasks.search(this.search.text)];

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
						   placeholder="search..."
						   value={ this.search.text }
						   onBlur={ ()=> this.search.showResults = false }
						   onFocus={ ()=> this.search.showResults = true }
						   onChange={ this.setSearchText } />
					<label className="search_checkbox cf">
						<input type="checkbox"
							   checked={ this.search.by.tasks }
							   onChange={ ()=> this.setSearchBy('tasks') } />
						<span>search by tasks</span>
					</label>
					<label className="search_checkbox cf">
						<input type="checkbox"
							   checked={ this.search.by.users }
							   onChange={ ()=> this.setSearchBy('users') } />
						<span>search by users</span>
					</label>
					<label className="search_checkbox cf">
						<input type="checkbox"
							   checked={ this.search.by.comments }
							   onChange={ ()=> this.setSearchBy('comments') } />
						<span>search by comments</span>
					</label>
				</div>

				{ this.search.showResults && this.search.results.length ?
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
