import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import JoinClass from '../Join/index';
import LeaveClass from '../Leave/index';
import { StyledCard } from '../../Styles/Cards';

import { ContainerOnlyForTeachersOwners } from '../../Permissions/Teacher/index';

import {
  ContainerOnlyForStudents,
  ContainerOnlyForStudentsInClass,
  ContainerOnlyForStudentsOutClass,
} from '../../Permissions/Student/index';

import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';

import DeleteClass from '../Delete/index';

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

        <ContainerOnlyForTeachersOwners creator={schoolclass.creator.id}>
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
          <DeleteClass id={schoolclass.id}>Delete</DeleteClass>
        </ContainerOnlyForTeachersOwners>

        <ContainerOnlyForStudentsInClass id={schoolclass.id}>
          <LeaveClass id={schoolclass.id}>Leave this class</LeaveClass>
        </ContainerOnlyForStudentsInClass>
        <ContainerOnlyForStudentsOutClass id={schoolclass.id}>
          <JoinClass id={schoolclass.id}>Join this class</JoinClass>
        </ContainerOnlyForStudentsOutClass>

        <ContainerOnlyForNoProfile>
          <Link
            href={{
              pathname: '/sign/invite',
              query: { id: schoolclass.id },
            }}
          >
            <a>
              <h2>Sign up as a student</h2>
            </a>
          </Link>
        </ContainerOnlyForNoProfile>
      </StyledCard>
    );
  }
}

export default ClassCard;
