import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../../User/index';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    emailLogin(email: $email, password: $password) {
      id
      username
      permissions
    }
  }
`;

class Login extends Component {
  state = {
    password: '',
    email: '',
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
          mutation={LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(emailLogin, { error, loading }) => (
            <SignForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await emailLogin();
                console.log('res', res);
                this.setState({ password: '', email: '' });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Login</h3>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Login</button>
              </fieldset>

              <Link href="/requestreset">
                <a style={{ float: 'right' }}>Forgot your password?</a>
              </Link>
            </SignForm>
          )}
        </Mutation>
      </>
    );
  }
}

export default Login;
