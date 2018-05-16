import { spy } from "mobx";
import { onPatch } from "mobx-state-tree";
// Models
import RootModel from "models/Root.model";

const store = RootModel.create({
	queries: {}
});

// MobX spy goes here
spy((event)=> {
	switch(event.type) {
		case 'action':
			if(event.name.match('-WARNING')) return console.log('%c' + event.name, 'color: darkorange');
			if(event.name.match('-ERROR')) return console.log('%c' + event.name, 'color: darkred');
			if(event.name.match('-SUCCESS')) return console.log('%c' + event.name, 'color: green');
			break;
		default :
			break;
	}
});


// @SOURCE: https://github.com/mobxjs/mobx-state-tree/blob/master/API.md#onpatch
onPatch(store, (patch)=> {
	let color = 'color: gray;';
	switch(patch.op) {
		case "add":
			color = 'color: green;';
			break;
		case "replace":
			color = 'color: darkorange;';
			break;
		case "remove":
			color = 'color: darkred;';
			break;
		default:
			color = 'color: black';
			break;
	}
	console.groupCollapsed(`%c🦄🌈 [@action: ${patch.op} ${patch.path}]`, color);
	console.log(patch);
	console.groupEnd(`%c🦄🌈 [@action: ${patch.op} ${patch.path}]`, color);
});


export default store;