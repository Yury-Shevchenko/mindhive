import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../../ErrorMessage/index';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      username
      permissions
    }
  }
`;

class Permissions extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) =>
          console.log('data', data) || (
            <div>
              <Error error={error} />
              <p>Hey</p>
            </div>
          )
        }
      </Query>
    );
  }
}

export default Permissions;
