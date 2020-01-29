import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $username: String!, $password: String!) {
    emailSignUp(email: $email, username: $username, password: $password){
      id
      username
      permissions
    }
  }
`;

class Signup extends Component {

  state = {
    username: '',
    password: '',
    email: '',
  }

  saveToState = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(emailSignUp, { error, loading }) => {
          return (
            <SignForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await emailSignUp();
                console.log('res', res);
                this.setState({ username: '', password: '', email: ''})
              }}
              >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Sign up</h3>
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
                <button type="submit">Sign up</button>
              </fieldset>
            </SignForm>
          )
        }}
      </Mutation>
    );
  }

}

export default Signup;
