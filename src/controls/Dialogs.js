import styled from 'styled-components';
// import AppDefaults from '../AppDefaults';

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

  font-family: ${AppDefaults.constants.font.family.default};
  font-weight: 500;
  text-align: left;
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