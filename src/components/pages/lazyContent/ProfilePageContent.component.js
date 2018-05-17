import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import Profile from "components/parts/profile/Profile.component";


@observer
class ProfilePageContent extends React.Component {

    render() {
        return (
            <div>
				<Profile />
            </div>
        )
    }
}


export default ProfilePageContent;
