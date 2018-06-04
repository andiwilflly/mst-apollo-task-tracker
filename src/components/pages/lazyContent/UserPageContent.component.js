import React from 'react';
// MobX
import { observer } from "mobx-react";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Components
import Profile from "components/parts/profile/Profile.component";
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


@observer
class UserPageContent extends React.Component {


	get userId() { return this.props.match.params.userId; };

    render() {
        return (
            <div>
				<QueryLoader query={ GET_USER_INFO_QUERY }
							 preLoader={<div className="cssload-loader-big"><PreLoader/></div>}
							 variables={{ id: this.userId }}>
				    <Profile userId={ this.userId } />
                </QueryLoader>
            </div>
        )
    }
}


export default UserPageContent;
