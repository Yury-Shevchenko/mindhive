import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../User/index';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword){
      id
      username
      permissions
    }
  }
`;

class Reset extends Component {

  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    password: '',
    confirmPassword: '',
  }

  saveToState = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(resetPassword, { error, loading, called }) => {
          return (
            <SignForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await resetPassword();
                this.setState({ password: '', confirmPassword: ''})
              }}
              >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Reset your password</h3>
                <Error error={error} />
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
                <label htmlFor="password">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset your password</button>
              </fieldset>
            </SignForm>
          )
        }}
      </Mutation>
    );
  }

}

export default Reset;
