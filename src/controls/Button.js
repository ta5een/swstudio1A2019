import styled, { css } from 'styled-components';
import AppDefaults from '../AppDefaults';

var BtnClr = Object.freeze({
  default: {
    normal: {
      TEXT: '#000000',
      BACKGROUND: '#FFFFFF',
      BORDER: '#848484'
    },
    disabled: {
      TEXT: '#848484',
      BACKGROUND: '#FFFFFF',
      BORDER: '#B2B2B2'
    }
  },

  primary: {
    normal: {
      TEXT: '#FFFFFF',
      BACKGROUND: '#1976D2',
      BORDER: '#1976D2'
    },
    disabled: {
      TEXT: '#FFFFFF',
      BACKGROUND: '#63A4ff',
      BORDER: '#1976D2'
    }
  },

  hint: {
    normal: {
      TEXT: '#1976D2',
      BACKGROUND: '#ffffff',
      BORDER: 'none'
    },
    disabled: {
      TEXT: '#848484',
      BACKGROUND: '#ffffff',
      BORDER: 'none'
    }
  }
});

const buttonFontSize = AppDefaults.constants.font.sizes.normal;
const buttonHintFontSize = AppDefaults.constants.font.sizes.normal;
const buttonBorderSize = '1px';

const Button = styled.button`
  background: ${BtnClr.default.normal.BACKGROUND};
  border: ${buttonBorderSize} solid ${BtnClr.default.normal.BORDER};
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
    border: ${buttonBorderSize} solid ${BtnClr.default.disabled.BORDER};
    box-shadow: none;
    cursor: not-allowed;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.BACKGROUND};
    border: ${buttonBorderSize} solid ${BtnClr.primary.normal.BORDER};
    color: ${BtnClr.primary.normal.TEXT};

    &:disabled {
      background: ${BtnClr.primary.disabled.BACKGROUND}
      border: ${buttonBorderSize} solid ${BtnClr.primary.disabled.BORDER};
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