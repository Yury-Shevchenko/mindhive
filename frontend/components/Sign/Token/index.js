import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../../User/index';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $token: String!) {
    tokenSignUp(username: $username, token: $token) {
      id
      username
      permissions
    }
  }
`;

class TokenSignup extends Component {
  state = {
    username: 'dag',
    token: 'gagafgfd',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(tokenSignUp, { error, loading }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await tokenSignUp();
              console.log('res', res);
              this.setState({ username: '', token: '' });
              if (this.props.redirect) {
                Router.push({
                  pathname: '/exp/run',
                  query: { id: this.props.redirect },
                });
              } else {
                Router.push({
                  pathname: '/me',
                });
              }
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Sign up with token</h3>
              <Error error={error} />
              <label htmlFor="token">
                Token
                <input
                  type="text"
                  name="token"
                  placeholder="token"
                  value={this.state.token}
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
              <button type="submit">Sign up with token</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default TokenSignup;
