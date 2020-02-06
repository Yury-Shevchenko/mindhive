import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../../User/index';

import Link from 'next/link';

const TOKEN_LOGIN_MUTATION = gql`
  mutation TOKEN_LOGIN_MUTATION($token: String!) {
    tokenLogin(token: $token){
      id
      username
      permissions
    }
  }
`;

class TokenLogin extends Component {

  state = {
    token: '',
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
          mutation={TOKEN_LOGIN_MUTATION}
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
                  <h3>Login</h3>
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
                  <button type="submit">Login with token</button>
                </fieldset>
              </SignForm>
            )
          }}
        </Mutation>


      </>
    );
  }

}

export default TokenLogin;
