import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

var BtnClr = Object.freeze({
  default: {
    normal: {
      text: '#4B2AE8',
      background: 'none',
      border: '#4B2AE8'
    },
    disabled: {
      text: '#4B2AE8',
      background: '#F3F3F7',
      border: '#4B2AE8'
    }
  },

  primary: {
    normal: {
      text: '#FFFFFF',
      // background: 'linear-gradient(315deg, #9655D0 0%, #836FEA 100%)',
      background: '#836FEA',
      border: 'none'
    },
    disabled: {
      text: '#FFFFFF',
      // background: 'linear-gradient(315deg, #BA7DF0 0%, #A593FF 100%)',
      background: '#A593FF',
      border: 'none'
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
      text: '#4B2AE8',
      background: 'none',
      border: 'none'
    },
    disabled: {
      text: '#4B2AE8',
      background: 'none',
      border: 'none'
    }
  }
});

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

export const Button = styled.button`
  background: ${BtnClr.default.normal.background};
  color: ${BtnClr.default.normal.text};

  border: ${globalBorderProps.size} solid ${BtnClr.default.normal.border};
  border-radius: ${globalBorderProps.radius};
  box-sizing: border-box;
  box-shadow: none;

  flex-grow: 1;
  padding: 0.8em 1.2em;
  height: 50px;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};
  text-align: center;
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;

  &:hover,
  &:active,
  &:focus {
    // box-shadow: 0px 5px 10px -4px rgba(153,153,153,1);
    // box-shadow: 0 5px 15px 0 rgba(150,85,208,0.25);
  }

  &:disabled {
    border: ${globalBorderProps.size} solid ${BtnClr.default.disabled.border};
    color: ${BtnClr.default.disabled.text};
    box-shadow: none;
    cursor: not-allowed;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.background};
    border: none;
    color: ${BtnClr.primary.normal.text};
    box-shadow: 0 15px 45px 0 rgba(150,85,208,0.25);

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.primary.disabled.background};
      border: none;
      color: ${BtnClr.primary.disabled.text};
      box-shadow: 0 0px 0px 0 rgba(150,85,208,0.25);
    }
  `}

  ${props => props.danger && css`
    background: ${BtnClr.danger.normal.background};
    border: ${globalBorderProps.size} solid ${BtnClr.danger.normal.border};
    color: ${BtnClr.danger.normal.text};

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.danger.disabled.background};
      border: ${globalBorderProps.size} solid ${BtnClr.danger.disabled.border};
      color: ${BtnClr.danger.disabled.text};
    }
  `}
`;

export const HintButton = styled(Button)`
    background: ${BtnClr.hint.normal.background};
    border: ${BtnClr.hint.normal.border};
    color: ${BtnClr.hint.normal.text};

    padding: 0px;
    height: auto;

    font-size: ${globalFontSizes.small};
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

export const BackButton = ({ to, from }) => {
  return <img className="back-button" src="/assets/icons/back_button.svg" alt="back button" onClick={() => from.props.history.push(to)}/>;
};