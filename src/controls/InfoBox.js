import styled, { css } from 'styled-components';
import Defaults from '../AppDefaults';

var InfoBoxClr = Object.freeze({
  default: {
    background: '#E0E0E0',
    border: '#848484'
  },
  warning: {
    background: '#F99F5E',
    border: '#E29258'
  },
  error: {
    background: '#D14040',
    border: '#D4242C'
  }
});

const InfoBox = styled.div`
  background: ${InfoBoxClr.default.background};
  border: 0.5px solid ${InfoBoxClr.default.border};
  border-radius: 5px;
  color: black;
  padding: 15px 20px;

  text-align: left;
  font-weight: 600;
`;

const WarningBox = styled(InfoBox)`
  background: ${InfoBoxClr.warning.background};
  border: 0.5px solid ${InfoBoxClr.warning.border};

  color: white;
`;

const ErrorBox = styled(InfoBox)`
  background: ${InfoBoxClr.error.background};
  border: 0.5px solid ${InfoBoxClr.error.border};

  color: white;
`;

export { InfoBox, WarningBox, ErrorBox };