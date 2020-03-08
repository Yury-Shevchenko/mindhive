import styled from 'styled-components';

export const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
  font-family: 'Lato', 'proxima-nova', 'Helvetica Neue', Arial, sans-serif;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.6;

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
