import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../../User/index';

import Link from 'next/link';

const INVITE_LOGIN_MUTATION = gql`
  mutation INVITE_LOGIN_MUTATION($username: String!, $invitedBy: ID!) {
    inviteLogin(username: $username, invitedBy: $invitedBy){
      id
      username
      permissions
    }
  }
`;

class InviteLogin extends Component {

  state = {
    username: 'dag',
    invitedBy: 'ck6aoz12hfgrs0901r7rti92h',
  }

  saveToState = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    return (
      <>
        <Mutation
          mutation={INVITE_LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[
            { query: CURRENT_USER_QUERY }
          ]}
        >
          {(tokenLogin, { error, loading }) => {
            return (
              <SignForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await tokenLogin();
                  console.log('res', res);
                  this.setState({ token: '' })
                }}
                >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h3>Login with invitation</h3>
                  <Error error={error} />
                  <label htmlFor="invitedBy">
                    Invitation ID
                    <input
                      type="text"
                      name="invitedBy"
                      placeholder="invitedBy"
                      value={this.state.invitedBy}
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
                  <button type="submit">Login with invitation</button>
                </fieldset>
              </SignForm>
            )
          }}
        </Mutation>


      </>
    );
  }

}

export default InviteLogin;
