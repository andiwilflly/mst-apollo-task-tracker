import React from 'react';
// Styles
import "styles/labels/labels_list.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Label extends React.Component {


	get label() { return store.labels.all.get(this.props.labelId); };

	
	render() {
		return (
			<div className="labels_list_label"
				 style={{ background: this.label.color }} />
		)
	}
}


export default Label;
