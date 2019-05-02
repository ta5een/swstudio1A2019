import styled, { css } from 'styled-components';
import Defaults from '../AppDefaults';

var BtnClr = Object.freeze({
  default: {
    normal: {
      TEXT: '#000000',
      BACKGROUND: '#ffffff',
      BORDER: '#b2b2b2'
    },
    disabled: {
      TEXT: '#b2b2b2',
      BACKGROUND: '#ffffff',
      BORDER: '#b2b2b2'
    }
  },

  primary: {
    normal: {
      TEXT: '#ffffff',
      BACKGROUND: '#1976d2',
      BORDER: '#1976d2'
    },
    disabled: {
      TEXT: '#ffffff',
      BACKGROUND: '#63a4ff',
      BORDER: '#1976d2'
    }
  },

  hint: {
    normal: {
      TEXT: 'grey',
      BACKGROUND: '#ffffff',
      BORDER: 'none'
    },
    disabled: {
      TEXT: 'grey',
      BACKGROUND: '#ffffff',
      BORDER: 'none'
    }
  }
});

const buttonFontSize = Defaults.constants.font.sizes.normal;
const buttonHintFontSize = Defaults.constants.font.sizes.normal;

const Button = styled.button`
  background: ${BtnClr.default.normal.BACKGROUND};
  border: 0.5px solid ${BtnClr.default.normal.BORDER};
  border-radius: 5px;
  color: ${BtnClr.default.normal.TEXT};
  flex-grow: 1;
  padding: 0.8em 1.2em;
  box-shadow: none;

  text-align: center;
  font-size: ${buttonFontSize}
  font-weight: 600;

  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;

  &:hover {
    box-shadow: 0px 5px 10px -4px rgba(153,153,153,1);
  }

  &:disabled {
    color: ${BtnClr.default.disabled.TEXT}
    box-shadow: none;
    cursor: not-allowed;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.BACKGROUND};
    border: 0.5px solid ${BtnClr.primary.normal.BORDER};
    color: ${BtnClr.primary.normal.TEXT};

    &:disabled {
      background: ${BtnClr.primary.disabled.BACKGROUND}
      border: 0.5px solid ${BtnClr.primary.disabled.BORDER};
      color: ${BtnClr.primary.disabled.TEXT}
    }
  `}
`;

const HintButton = styled(Button)`
    background: ${BtnClr.hint.normal.BACKGROUND};
    border: ${BtnClr.hint.normal.BORDER};
    color: ${BtnClr.hint.normal.TEXT};

    font-size: ${buttonHintFontSize}
    font-weight: 500;

    &:hover {
      box-shadow: none;
      font-weight: 600;
    }
`;

export { Button, HintButton };