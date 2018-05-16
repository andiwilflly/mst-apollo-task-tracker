import React from 'react';
// MobX
import { observer } from "mobx-react";

@observer
class HomePageContent extends React.Component {


    state = {
        show: false
    };


    render() {
        return (
            <div>
                HomePage!
            </div>
        )
    }
}


export default HomePageContent;
