import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { StyledExperimentCard } from './styles';

import DeleteExperiment from '../Experiment/Delete/index';

import { ContainerOnlyForScientists } from '../Permissions/Scientist/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../Permissions/Profile/index';

import TokenSignup from '../Sign/Token/index';

class ExperimentCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    experimentCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { experiment } = this.props;
    return (
      <StyledExperimentCard>
        <Link
          href={{
            pathname: '/exp',
            query: { id: experiment.id },
          }}
        >
          <a>
            <h2>{experiment.title}</h2>
            <p>{experiment.description}</p>
          </a>
        </Link>

        <ContainerOnlyForScientists>
          <Link
            href={{
              pathname: '/bank/edit',
              query: { id: experiment.id },
            }}
          >
            <a>
              <h2>Edit</h2>
            </a>
          </Link>
          <DeleteExperiment id={experiment.id}>Delete</DeleteExperiment>
        </ContainerOnlyForScientists>

        <ContainerOnlyForProfile>
          <Link
            href={{
              pathname: '/exp/run',
              query: { id: experiment.id },
            }}
          >
            <a>
              <h2>Run</h2>
            </a>
          </Link>
        </ContainerOnlyForProfile>

        <ContainerOnlyForNoProfile>
          <TokenSignup redirect={experiment.id} />
        </ContainerOnlyForNoProfile>
      </StyledExperimentCard>
    );
  }
}

export default ExperimentCard;

// <Link
//   href={{
//     pathname: '/exp/run',
//     query: { id: experiment.id },
//   }}
// >
//   <a>
//     <h2>Sign up and run</h2>
//   </a>
// </Link>
