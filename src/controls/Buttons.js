import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

const BtnClr = Object.freeze({
  default: {
    normal: {
      text: globalColours.purple.vibrant,
      background: 'none',
      border: globalColours.purple.dark
    },
    disabled: {
      text: globalColours.purple.mute.vibrant,
      background: 'none',
      border: globalColours.purple.mute.dark
    }
  },

  primary: {
    normal: {
      text: globalColours.basic.pure,
      background: `linear-gradient(315deg, ${globalColours.purple.light} 0%, ${globalColours.purple.dark} 100%)`,
      // background: globalColours.purple.light,
      border: 'none'
    },
    disabled: {
      text: globalColours.basic.pure,
      background: `linear-gradient(3151deg, ${globalColours.purple.mute.light} 0%, ${globalColours.purple.mute.dark} 100%)`,
      // background: globalColours.purple.light,
      border: 'none'
    }
  },

  danger: {
    normal: {
      text: globalColours.basic.pure,
      background: `linear-gradient(3151deg, ${globalColours.red.light} 0%, ${globalColours.red.dark} 100%)`,
      // background: globalColours.red.light,
      border: 'none'
    },
    disabled: {
      text: globalColours.basic.pure,
      background: `linear-gradient(3151deg, ${globalColours.red.mute.light} 0%, ${globalColours.red.mute.dark} 100%)`,
      // background: globalColours.red.light,
      border: 'none'
    }
  },

  hint: {
    normal: {
      text: globalColours.purple.vibrant,
      background: 'none',
      border: 'none'
    },
    disabled: {
      text: globalColours.purple.mute.vibrant,
      background: 'none',
      border: 'none'
    }
  }
});

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

  &:disabled {
    background: ${BtnClr.default.disabled.background};
    color: ${BtnClr.default.disabled.text};

    border: ${globalBorderProps.size} solid ${BtnClr.default.disabled.border};
    box-shadow: none;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.background};
    color: ${BtnClr.primary.normal.text};

    border: none;
    box-shadow: 0 15px 45px 0 rgba(150,85,208,0.25);

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.primary.disabled.background};
      color: ${BtnClr.primary.disabled.text};

      border: none;
      box-shadow: 0 0px 0px 0 rgba(150,85,208,0.25);
    }
  `}

  ${props => props.danger && css`
    background: ${BtnClr.danger.normal.background};
    color: ${BtnClr.danger.normal.text};

    border: none;
    box-shadow: 0 15px 45px 0 rgba(236,98,100,0.25);

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.danger.disabled.background};
      color: ${BtnClr.danger.disabled.text};

      border: none;
      box-shadow: 0 0px 0px 0 rgba(236,98,100,0.25);
    }
  `}

  ${props => props.hint && css`
    background: ${BtnClr.hint.normal.background};
    color: ${BtnClr.hint.normal.text};

    border: ${BtnClr.hint.normal.border};

    font-size: ${globalFontSizes.small};
    font-weight: 500;

    padding: 0px;
    height: auto;

    &:disabled {
      background: ${BtnClr.hint.disabled.background};
      border: ${BtnClr.hint.disabled.border};
      color: ${BtnClr.hint.disabled.text};
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