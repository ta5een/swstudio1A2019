import styled, { css } from 'styled-components';
import AppDefaults from '../AppDefaults';

var BtnClr = Object.freeze({
  default: {
    normal: {
      text: '#000000',
      background: '#FFFFFF',
      border: '#848484'
    },
    disabled: {
      text: '#848484',
      background: '#FFFFFF',
      border: '#B2B2B2'
    }
  },

  primary: {
    normal: {
      text: '#FFFFFF',
      background: '#1976D2',
      border: '#1976D2'
    },
    disabled: {
      text: '#FFFFFF',
      background: '#63A4ff',
      border: '#5790e0'
    }
  },

  danger: {
    normal: {
      text: '#FFFFFF',
      background: '#D14A32',
      border: '#D4242C'
    },
    disabled: {
      text: '#FFFFFF',
      background: '#D4242C',
      border: '#D4242C'
    }
  },

  hint: {
    normal: {
      text: '#1976D2',
      background: 'none',
      border: 'none'
    },
    disabled: {
      text: '#848484',
      background: 'none',
      border: 'none'
    }
  }
});

const buttonFontSize = AppDefaults.constants.font.sizes.normal;
const buttonHintFontSize = AppDefaults.constants.font.sizes.normal;
const buttonBorderSize = '1px';

export const Button = styled.button`
  background: ${BtnClr.default.normal.background};
  border: ${buttonBorderSize} solid ${BtnClr.default.normal.border};
  border-radius: 5px;
  color: ${BtnClr.default.normal.text};
  flex-grow: 1;
  padding: 0.8em 1.2em;
  box-shadow: none;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: ${buttonFontSize};
  text-align: center;
  font-weight: 400;

  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0px 5px 10px -4px rgba(153,153,153,1);
  }

  &:disabled {
    border: ${buttonBorderSize} solid ${BtnClr.default.disabled.border};
    color: ${BtnClr.default.disabled.text};
    box-shadow: none;
    cursor: not-allowed;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.background};
    border: ${buttonBorderSize} solid ${BtnClr.primary.normal.border};
    color: ${BtnClr.primary.normal.text};

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.primary.disabled.background};
      border: ${buttonBorderSize} solid ${BtnClr.primary.disabled.border};
      color: ${BtnClr.primary.disabled.text};
    }
  `}

  ${props => props.danger && css`
    background: ${BtnClr.danger.normal.background};
    border: ${buttonBorderSize} solid ${BtnClr.danger.normal.border};
    color: ${BtnClr.danger.normal.text};

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.danger.disabled.background};
      border: ${buttonBorderSize} solid ${BtnClr.danger.disabled.border};
      color: ${BtnClr.danger.disabled.text};
    }
  `}
`;

export const HintButton = styled(Button)`
    background: ${BtnClr.hint.normal.background};
    border: ${BtnClr.hint.normal.border};
    color: ${BtnClr.hint.normal.text};

    font-size: ${buttonHintFontSize};
    font-weight: 500;

    &:hover,
    &:active,
    &:focus {
      box-shadow: none;
    }

    &:disabled {
      background: ${BtnClr.hint.disabled.background};
      border: ${BtnClr.hint.disabled.border};
      color: ${BtnClr.hint.disabled.text};
    }
`;