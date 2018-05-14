import React from 'react';
// Css
import "styles/preloader.css";


const PreLoader = ()=> (
	<div className="cssload-loader">
		<div className="cssload-inner cssload-one"/>
		<div className="cssload-inner cssload-two"/>
		<div className="cssload-inner cssload-three"/>
	</div>
);

export default PreLoader;