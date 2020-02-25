import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../../User/index';

const INVITE_SIGNUP_MUTATION = gql`
  mutation INVITE_SIGNUP_MUTATION($username: String!, $invitedBy: ID!) {
    inviteSignUp(username: $username, invitedBy: $invitedBy) {
      id
      username
      permissions
    }
  }
`;

class InviteSignup extends Component {
  state = {
    username: 'dag',
    invitedBy: this.props.invitedBy,
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={INVITE_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(inviteSignUp, { error, loading }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await inviteSignUp();
              console.log('res', res);
              this.setState({ username: '', invitedBy: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Sign up with invitation</h3>
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
              <button type="submit">Sign up with invitation</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default InviteSignup;
