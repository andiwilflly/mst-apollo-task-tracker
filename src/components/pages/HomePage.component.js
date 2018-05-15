import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
// Components
import PreLoader from "components/parts/PreLoader.component";


@observer
@permissions
class HomePage extends React.Component {

	static permissions = {
		needAuth: true
	};


	state = {
		LazyComponent: null
	};


	componentDidMount() {
        this.loadComponentLazy();
	}


    loadComponentLazy() {
        import(/* webpackChunkName: "home" */ 'components/pages/lazyContent/HomePageContent.component').then(LazyComponent => {
            this.setState((prevState, props)=> ({ LazyComponent: LazyComponent.default }))
		})
    };


	render() {
		const { LazyComponent } = this.state;

		return (
			<div>
				{ LazyComponent ?
					<LazyComponent />
					:
					<PreLoader /> }
			</div>
		)
	}
}


export default HomePage;
