import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const REVIEW_MY_RESULTS = gql`
  query REVIEW_MY_RESULTS {
    myResults {
      id
      experiment {
        id
        title
      }
      quantity
      data
    }
  }
`;

class ResultReviewer extends Component {
  render() {
    return (
      <Query
        query={REVIEW_MY_RESULTS}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {({ data, loading, error }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.myResults) return <p>No results found</p>;
          const results = data.myResults;
          return (
            <ul>
              {results.map(result => (
                <p key={result.id}>
                  <h2>Some result(s) from {result.experiment.title}</h2>
                  {result.data}
                  <span>---------</span>
                </p>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default ResultReviewer;
