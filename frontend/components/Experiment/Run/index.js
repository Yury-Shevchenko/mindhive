import React, { Component } from 'react';
import Head from 'next/head';
import { ExperimentWindow } from '../../Labjs/index';

import AddResult from '../../Results/Add/index';

import { StyledBox } from './styles';

class RunExperiment extends Component {
  render() {
    return (
      <>
        <Head>
          <link href="/static/lab.css" rel="stylesheet" />
        </Head>
        <StyledBox>
          <AddResult experimentId={this.props.id} />
          <ExperimentWindow
            settings={{
              script: 'Visual search',
              params: { iti: 1000 },
              eventCallback: e => {
                console.log('Event callback', e);
              },
              on_finish: csv => {
                console.log('data', csv);
              },
            }}
          />
        </StyledBox>
      </>
    );
  }
}

export default RunExperiment;
