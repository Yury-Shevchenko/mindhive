import styled from 'styled-components';

export const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
  font-family: 'radnika_next';
  font-size: 1.5rem;
  line-height: 2;

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2');
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }

`;

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;
