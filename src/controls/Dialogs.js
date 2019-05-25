import styled from 'styled-components';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router-dom';

import Globals from '../Globals';

const InfoBoxColour = Object.freeze({
  default: {
    background: '#DEDEE3',
    border: '#848484'
  },
  warning: {
    background: '#F99F5E',
    border: '#E29258'
  },
  error: {
    background: '#D05567',
    border: '#D4242C'
  },
  success: {
    background: 'green',
    border: 'green'
  }
});

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

export const InfoBox = styled.div`
  background: ${InfoBoxColour.default.background};
  border: ${globalBorderProps.size} solid ${InfoBoxColour.default.border};
  border-radius: ${globalBorderProps.radius};
  color: black;
  padding: 15px 20px;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};
  font-weight: 400;
  text-align: left;
`;

export const WarningBox = styled(InfoBox)`
  background: ${InfoBoxColour.warning.background};
  border: ${globalBorderProps.size} solid ${InfoBoxColour.warning.border};

  color: white;
`;

export const ErrorBox = styled(InfoBox)`
  background: ${InfoBoxColour.error.background};
  border: ${globalBorderProps.size} solid ${InfoBoxColour.error.border};

  color: white;
`;

export const SuccessBox = styled(InfoBox)`
  background: ${InfoBoxColour.success.background};
  border: ${globalBorderProps.size} solid ${InfoBoxColour.success.border};

  color: white
`;

export const DialogType = Object.freeze({
  DEFAULT: 0,
  WARNING: 1,
  ERROR: 2
});

export function showInfoBox(caller, message, type=DialogType.DEFAULT, { description, page }={}) {
  const infoBoxDiv = document.getElementById('infoBoxDiv');

  switch (type) {
    case 1:
      ReactDOM.render(<WarningBox>{message} {{ description, page } ? composeLink(caller, description, page) : null}</WarningBox>, infoBoxDiv);
      break;
    case 2:
      ReactDOM.render(<ErrorBox>{message} {{ description, page } ? composeLink(caller, description, page) : null}</ErrorBox>, infoBoxDiv);
      break;
    default:
      ReactDOM.render(<InfoBox>{message} {{ description, page } ? composeLink(caller, description, page) : null}</InfoBox>, infoBoxDiv);
  }

  infoBoxDiv.hidden = false;
}

function composeLink(caller, description, page) {
  return (
    <Router history={caller.props.history}>
      <Link to={page} onClick={() => this.props.history.push(page)}>{description}</Link>
    </Router>
  );
}