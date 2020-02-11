import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from './styles';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ADD_RESULT_MUTATION } from '../../Results/Add/index';

class RunExperiment extends Component {
  render() {
    const { experimentId } = this.props;
    return (
      <>
        <Head>
          <link href="/static/lab.css" rel="stylesheet" />
        </Head>
        <StyledBox>
          <Mutation
            mutation={ADD_RESULT_MUTATION}
            variables={{ experimentId }}
            refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
          >
            {addResult => (
              <ExperimentWindow
                settings={{
                  script: 'Visual search',
                  params: { iti: 1000 },
                  eventCallback: e => {
                    console.log('Event callback', e);
                  },
                  on_finish: csv => {
                    console.log('data', csv);
                    addResult({ variables: { data: csv } });
                    Router.push('/bank');
                  },
                }}
              />
            )}
          </Mutation>
        </StyledBox>
      </>
    );
  }
}

export default RunExperiment;
