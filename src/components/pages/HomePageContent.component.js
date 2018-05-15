import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Queries
import ALL_POSTS_QUERY from "graphql/queries/allPosts.query";
// Components
import QueryLoader from "components/QueryLoader.component";


@observer
class HomePageContent extends React.Component {


    state = {
        show: false
    };


    render() {
        return (
            <div>
                { this.state.show ?
                    <QueryLoader query={ ALL_POSTS_QUERY }>
                        HomePage!
                    </QueryLoader>
                    :
                    <div>hide!</div>
                }
                <button onClick={ ()=> this.setState({ show: !this.state.show }) }>toggle</button>

                <Link to="/boards">boards</Link>
            </div>
        )
    }
}


export default HomePageContent;
