import React from 'react';
// Components
import PreLoader from "components/parts/PreLoader.component";


const lazy = (loadLazyComponent)=> {
	return (Component)=> {
		return class Lazy extends Component {

			state = {
				LazyComponent: null
			};


			componentDidMount() {
				this.loadComponentLazy();
			}


			loadComponentLazy() {
				loadLazyComponent().then(LazyComponent=> {
					this.setState((prevState, props)=> ({ LazyComponent: LazyComponent.default }))
				})
			};

			render() {
				const { LazyComponent } = this.state;

				return (
					<div>
						{ LazyComponent ? <LazyComponent { ...this.props } /> : <div className="cssload-loader-big"><PreLoader/></div> }
					</div>
				)
			}
		};
	};
};



export default lazy;