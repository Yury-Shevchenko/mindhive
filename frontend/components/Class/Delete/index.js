import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_CLASSES_QUERY } from '../All/index';

const DELETE_CLASS_MUTATION = gql`
  mutation DELETE_CLASS_MUTATION($id: ID!) {
    deleteClass(id: $id) {
      id
    }
  }
`;

class DeleteClass extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: ALL_CLASSES_QUERY });
    console.log('data', data);
    console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.classes = data.classes.filter(
      exp => exp.id !== payload.data.deleteClass.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: ALL_CLASSES_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_CLASS_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteClass, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this class?')) {
                deleteClass().catch(err => {
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

export default DeleteClass;
