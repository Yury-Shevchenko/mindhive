import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import JoinClass from '../Join/index';
import LeaveClass from '../Leave/index';
import { StyledCard } from '../../Styles/Cards';

import { ContainerOnlyForTeachers } from '../../Permissions/Teacher/index';

import User from '../../User/index';

class ClassCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    classCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { schoolclass } = this.props;
    return (
      <StyledCard>
        <Link
          href={{
            pathname: '/class',
            query: { id: schoolclass.id },
          }}
        >
          <a>
            <h2>{schoolclass.title}</h2>
            <p>{schoolclass.description}</p>
            <p>Teacher {schoolclass.creator.username}</p>
          </a>
        </Link>
        <ContainerOnlyForTeachers>
          <Link
            href={{
              pathname: '/class/edit',
              query: { id: schoolclass.id },
            }}
          >
            <a>
              <h2>Edit</h2>
            </a>
          </Link>
        </ContainerOnlyForTeachers>

        <JoinClass id={schoolclass.id}>Join this class</JoinClass>

        <Link
          href={{
            pathname: '/sign/invite',
            query: { id: schoolclass.creator.id },
          }}
        >
          <a>
            <h2>Sign in</h2>
          </a>
        </Link>

        <LeaveClass id={schoolclass.id}>Leave this class</LeaveClass>
      </StyledCard>
    );
  }
}

export default ClassCard;
