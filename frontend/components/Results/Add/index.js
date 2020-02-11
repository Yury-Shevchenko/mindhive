import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const ADD_RESULT_MUTATION = gql`
  mutation addResult($experimentId: ID!, $data: String) {
    addResult(experimentId: $experimentId, data: $data) {
      id
      quantity
    }
  }
`;

class ResultCollector extends Component {
  render() {
    const { experimentId } = this.props;
    return (
      <Mutation
        mutation={ADD_RESULT_MUTATION}
        variables={{ experimentId }}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {addResult => <button onClick={addResult}>Add a new result</button>}
      </Mutation>
    );
  }
}

export default ResultCollector;
export { ADD_RESULT_MUTATION };
