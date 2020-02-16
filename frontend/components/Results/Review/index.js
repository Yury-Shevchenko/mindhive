import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import ResultLine from './line';

// const REVIEW_MY_RESULTS = gql`
//   query REVIEW_MY_RESULTS {
//     myResults {
//       id
//       experiment {
//         id
//         title
//       }
//       quantity
//       data
//       updatedAt
//     }
//   }
// `;

class ResultReviewer extends Component {
  render() {
    return (
      <Query
        query={CURRENT_USER_RESULTS_QUERY}
        // refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {({ data, loading, error }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.me.results) return <p>No results found</p>;
          const { results } = data.me;
          return (
            <ul>
              {results.map(result => (
                <ResultLine key={result.id} result={result} />
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default ResultReviewer;
// export { REVIEW_MY_RESULTS };
