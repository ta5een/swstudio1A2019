import styled, { css } from 'styled-components';
import Defaults from '../AppDefaults';

var ErrorBoxClr = Object.freeze({
  default: {
    background: '#D14040',
    border: '#D4242C'
  },
  warning: {
    background: '#F99F5E',
    border: '#E29258'
  }
});

const ErrorBox = styled.div`
  background: ${ErrorBoxClr.default.background};
  border: 0.5px solid ${ErrorBoxClr.default.border};
  border-radius: 5px;
  color: white;
  padding: 2px 10px;

  text-align: left;
  font-weight: 600;

  ${props => props.warning && css`
    background: ${ErrorBoxClr.warning.background};
    border: 0.5px solid ${ErrorBoxClr.warning.border};
  `}
`;

export { ErrorBox };