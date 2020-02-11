import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_EXPERIMENTS_QUERY } from '../../Experiments/index';

const DELETE_EXPERIMENT_MUTATION = gql`
  mutation DELETE_EXPERIMENT_MUTATION($id: ID!) {
    deleteExperiment(id: $id) {
      id
    }
  }
`;

class DeleteExperiment extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: ALL_EXPERIMENTS_QUERY });
    console.log('data', data);
    console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.experiments = data.experiments.filter(
      exp => exp.id !== payload.data.deleteExperiment.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: ALL_EXPERIMENTS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_EXPERIMENT_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteExperiment, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this experiment?')) {
                deleteExperiment().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteExperiment;
