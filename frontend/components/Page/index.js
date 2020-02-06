import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '../Header/index';
import Meta from '../Meta/index';

import { StyledPage, Inner } from './styles';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  white: 'white',
  yellow: 'yellow',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
  }
`

class Page extends Component {
  render() {
    return(
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
        <GlobalStyle/>
      </ThemeProvider>
    )
  }
}

export default Page;

// <GlobalStyle/>
