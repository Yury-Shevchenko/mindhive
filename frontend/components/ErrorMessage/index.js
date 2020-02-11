import React from 'react';
import PropTypes from 'prop-types';
import { ErrorStyles } from './styles';

const pirateWords = [
  'Ahoy!',
  'Blimey!',
  'Shiver me timbers!',
  'Heave ho!',
  'Yo ho ho!',
];

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>
            {pirateWords[Math.floor(Math.random() * pirateWords.length)]}
          </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Ahoy!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
