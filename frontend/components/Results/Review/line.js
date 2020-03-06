import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import DeleteResultBtn from '../Delete/index';

const StyledResultLine = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr 1fr;
`;

class ResultLine extends Component {
  render() {
    const { result } = this.props;
    return (
      <StyledResultLine>
        <Link
          href={{
            pathname: '/res/ind',
            query: { id: result.id },
          }}
        >
          <a>
            <h2>{result.experiment.title}</h2>
          </a>
        </Link>
        <p>{result.updatedAt}</p>
        <DeleteResultBtn id={result.id}>Delete</DeleteResultBtn>
      </StyledResultLine>
    );
  }
}

export default ResultLine;
