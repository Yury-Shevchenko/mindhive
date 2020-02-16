import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

const JOIN_CLASS_MUTATION = gql`
  mutation JOIN_CLASS_MUTATION($id: ID!) {
    joinClass(id: $id) {
      message
    }
  }
`;

class JoinClass extends Component {
  render() {
    return (
      <Mutation
        mutation={JOIN_CLASS_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(joinClass, { error }) => (
          <button
            type="button"
            onClick={async () => {
              const res = await joinClass();
              // console.log('res', res);
              Router.push({
                pathname: '/class',
                query: { id: this.props.id },
              });
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default JoinClass;
