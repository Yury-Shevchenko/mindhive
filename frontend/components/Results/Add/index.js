import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index'

const ADD_RESULT_MUTATION = gql`
  mutation addResult($experimentId: ID!) {
    addResult(experimentId: $experimentId){
      id
      quantity
    }
  }
`

class AddResult extends Component {

  render() {
    const { experimentId } = this.props
    return (
      <Mutation
        mutation={ADD_RESULT_MUTATION}
        variables={{experimentId}}
        refetchQueries={[
          {query: CURRENT_USER_RESULTS_QUERY}
        ]}
      >
        { (addResult) => {
          return (
            <button onClick={addResult}>
              Add a new result
            </button>
          )
        }}
      </Mutation>
    );
  }

}

export default AddResult;
