import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Center, ExperimentsList } from './styles';
import ExperimentCard from '../ExperimentCard/index';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_EXPERIMENTS_QUERY = gql`
  query ALL_EXPERIMENTS_QUERY {
    experiments {
      id
      title
      description
      image
      largeImage
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class Experiments extends Component {

  render() {
    return (
      <Center>
        <h1>Experiments</h1>
        <Query query={ALL_EXPERIMENTS_QUERY}>
          { ({data, error, loading}) => {
            console.log('data', data);
            if(loading) return <p>Loading ...</p>
            if(error) return <p>Error: {error.message}</p>
            return <ExperimentsList>
              {data.experiments.map(experiment =>
                <ExperimentCard experiment={experiment} key={experiment.id} />
              )}
            </ExperimentsList>
          } }
        </Query>
      </Center>
    );
  }

}

export default Experiments;
export { ALL_EXPERIMENTS_QUERY };
