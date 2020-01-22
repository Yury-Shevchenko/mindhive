import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class ExperimentCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    experimentCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  }

  render() {
    const { experiment } = this.props;
    return (
      <div>
        <Link href={{
          pathname: '/bank',
          query: {id: experiment.title}
        }}>
          <a>
            {experiment.title}
          </a>
        </Link>
      </div>
    );
  }

}

export default ExperimentCard;
