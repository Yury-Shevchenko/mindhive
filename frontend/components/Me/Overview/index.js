import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import Link from 'next/link';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import ResultPane from '../../Results/Pane/index';

/* eslint-disable */
// compose all components together
const Composed = adopt({
  user: ({ render }) => <Query query={ CURRENT_USER_RESULTS_QUERY }>{render}</Query>,
})
/* eslint-enable */

// TODO write mutation to change the profile information

class Me extends Component {
  render() {
    return (
      <Composed>
        {({ user, localState }) => {
          if (!user.data) return null;
          const { me } = user.data;
          if (!me) return null;
          return (
            <div>
              <ul>
                {me.results.map(result => (
                  <ResultPane key={result.id} result={result} />
                ))}
              </ul>
              Your classes
              <ul>
                {me.studentIn.map(schoolclass => (
                  <div key={schoolclass.id}>
                    <Link
                      href={{
                        pathname: '/class',
                        query: { id: schoolclass.id },
                      }}
                    >
                      <a>{schoolclass.title}</a>
                    </Link>
                  </div>
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
                    <button>See my results</button>
                  </a>
                </Link>
              </footer>
            </div>
          );
        }}
      </Composed>
    );
  }
}

export default Me;
