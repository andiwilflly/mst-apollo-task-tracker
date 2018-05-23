import gql from 'graphql-tag';


export default gql`query allLabels {
	allLabels {
		id
		color
		tasks {
			id
		}
	}
}`
