import styled from 'styled-components';

export const Center = styled.div`
  text-align: center;
`;

export const ExperimentsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;
