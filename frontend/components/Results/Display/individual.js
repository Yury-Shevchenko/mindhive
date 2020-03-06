import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../../ErrorMessage/index';

const DISPLAY_RESULT_QUERY = gql`
  query DISPLAY_RESULT_QUERY($id: ID!) {
    result(where: { id: $id }) {
      id
      experiment {
        id
      }
      user {
        id
      }
      quantity
      data
      createdAt
      updatedAt
    }
  }
`;

// dynamic import - should work only in browser, no server side rendering (ssr: false)
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const PlotInBrowser = dynamic(() => import('./plot'), {
  ssr: false,
});

class DisplayIndividualResult extends Component {
  render() {
    return (
      <Query
        query={DISPLAY_RESULT_QUERY}
        variables={{ id: this.props.resultId }}
      >
        {({ error, loading, data }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.result)
            return <p>No result found for {this.props.resultId}</p>;
          const { result } = data;
          return <PlotInBrowser data={result.data} />;
        }}
      </Query>
    );
  }
}

export default DisplayIndividualResult;
