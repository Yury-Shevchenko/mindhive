import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../../User/index';

const INVITE_LOGIN_MUTATION = gql`
  mutation INVITE_LOGIN_MUTATION($username: String!, $invitedIn: ID!) {
    inviteLogin(username: $username, invitedIn: $invitedIn) {
      id
      username
      permissions
    }
  }
`;

class InviteLogin extends Component {
  state = {
    username: 'new test student',
    invitedIn: 'ck7amwshxs4wt0986t2v0jht9',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <Mutation
          mutation={INVITE_LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(tokenLogin, { error, loading }) => (
            <SignForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await tokenLogin();
                console.log('res', res);
                this.setState({ token: '' });
                Router.push({
                  pathname: '/me',
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Login as a student</h3>
                <Error error={error} />
                <label htmlFor="invitedIn">
                  Invitation ID
                  <input
                    type="text"
                    name="invitedIn"
                    placeholder="invitedIn"
                    value={this.state.invitedIn}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="username">
                  Username
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Login</button>
              </fieldset>
            </SignForm>
          )}
        </Mutation>
      </>
    );
  }
}

export default InviteLogin;
