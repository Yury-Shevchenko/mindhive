import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

const LEAVE_CLASS_MUTATION = gql`
  mutation LEAVE_CLASS_MUTATION($id: ID!) {
    leaveClass(id: $id) {
      message
    }
  }
`;

class LeaveClass extends Component {
  render() {
    return (
      <Mutation
        mutation={LEAVE_CLASS_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(leaveClass, { error }) => (
          <button
            type="button"
            onClick={async () => {
              const res = await leaveClass();
              Router.push({
                pathname: '/classes',
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

export default LeaveClass;
