import styled, { keyframes } from 'styled-components';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Dot = styled.div`
  background-color: ${ props => props.dotsColor ? props.dotsColor: '#000' };
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;

  animation: ${ BounceAnimation } 0.5s linear infinite;
  animation-delay: ${ props => props.delay };
`;
