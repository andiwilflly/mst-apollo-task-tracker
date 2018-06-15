import React from 'react';
// Utils
import lazy from "utils/lazy.utils";


@lazy(()=> import(/* webpackChunkName: "EditorHTML" */ 'components/parts/EditorHTML.component'))
class EditorHTML extends React.Component {
}


export default EditorHTML;
