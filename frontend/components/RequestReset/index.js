import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await reset();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Request a password reset</h3>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Check your mailtrop email box for a reset link.</p>
              )}
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
              <button type="submit">Request reset</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
