import React, { Component } from 'react';
import { StyledResultPane } from './styles';

class ResultPane extends Component {
  render() {
    const { experiment } = this.props.result;
    return <StyledResultPane>{experiment.title}</StyledResultPane>;
  }
}

export default ResultPane;
