import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import Link from 'next/link';
import { CURRENT_USER_RESULTS_QUERY } from '../User/index';
import { CartStyles, Supreme, CloseButton, SickButton } from './styles';
import ResultPane from '../Results/Pane/index';

// use @client to look at only client (and do not check the server )
const LOCAL_STATE_QUERY = gql`
  query {
    dashboardOpen @client
  }
`;

const TOGGLE_DASHBOARD_MUTATION = gql`
  mutation {
    toggleDashboard @client
  }
`;

/* eslint-disable */
// compose all components together
const Composed = adopt({
  user: ({ render }) => <Query query={ CURRENT_USER_RESULTS_QUERY }>{render}</Query>,
  toggleDashboard: ({ render }) => <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
})
/* eslint-enable */

class Dashboard extends Component {
  render() {
    return (
      <Composed>
        {({ user, toggleDashboard, localState }) => {
          if (!user.data) return null;
          const { me } = user.data;
          if (!me) return null;
          return (
            <CartStyles open={localState.data.dashboardOpen}>
              <header>
                <CloseButton title="close" onClick={toggleDashboard}>
                  &times;
                </CloseButton>
                <Supreme>{me.username}'s dashboard</Supreme>
                <p>You have {me.permissions} permissions</p>
                <p>
                  You have {me.results.length} result
                  {me.results.length === 1 ? '' : 's'}{' '}
                </p>
              </header>
              <ul>
                {me.results.map(result => (
                  <ResultPane key={result.id} result={result} />
                ))}
              </ul>
              Your classes
              <ul>
                {me.studentIn.map(schoolclass => (
                  <div key={schoolclass.id}>{schoolclass.title}</div>
                ))}
              </ul>
              <footer>
                <p>This is footer</p>
                <Link
                  href={{
                    pathname: '/res/my',
                  }}
                >
                  <a>
                    <SickButton>See my results</SickButton>
                  </a>
                </Link>
              </footer>
            </CartStyles>
          );
        }}
      </Composed>
    );
  }
}

export default Dashboard;
export { LOCAL_STATE_QUERY, TOGGLE_DASHBOARD_MUTATION };
