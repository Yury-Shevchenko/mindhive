import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import ReviewClass from '../../Class/Review/index';

const INVITE_SIGNUP_MUTATION = gql`
  mutation INVITE_SIGNUP_MUTATION($username: String!, $invitedIn: ID!) {
    inviteSignUp(username: $username, invitedIn: $invitedIn) {
      id
      username
      permissions
    }
  }
`;

class InviteSignup extends Component {
  state = {
    username: 'dag',
    invitedIn: this.props.invitedIn,
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
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(inviteSignUp, { error, loading }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await inviteSignUp();
              console.log('res', res);
              this.setState({ username: '', invitedIn: '' });
              Router.push({
                pathname: '/class',
                query: { id: this.props.invitedIn },
              });
            }}
          >
            <ReviewClass id={this.props.invitedIn} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Sign up as a student</h3>
              <Error error={error} />
              <label htmlFor="username">
                Create a username
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign up</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default InviteSignup;
