import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../../ErrorMessage/index';
import Head from 'next/head';

import { StyledExperiment } from './styles';

const REVIEW_EXPERIMENT_QUERY = gql`
 query REVIEW_EXPERIMENT_QUERY ($id: ID!) {
   experiment(where: {id: $id}) {
     id
     title
     description
     largeImage
   }
 }
`

class ReviewExperiment extends Component {

  render() {
    return (
      <Query query={REVIEW_EXPERIMENT_QUERY} variables={{id: this.props.id}}>
        { ({error, loading, data}) => {
          if(error) return <Error error={error} />
          if(loading) return <p>Loading</p>
          if(!data.experiment) return <p>No experiment found for {this.props.id}</p>
          const exp = data.experiment;
          return (
            <StyledExperiment>
              <Head>
                <title>mindHIVE | {exp.title}</title>
              </Head>
              <h2>
                {exp.title}
              </h2>
              <p>
                {exp.description}
              </p>
            </StyledExperiment>
          )
        }}

      </Query>
    );
  }

}

export default ReviewExperiment;
