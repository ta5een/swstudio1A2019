import styled from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

export const TextField = styled.input`
  background: none;
  border: ${globalBorderProps.size} solid #9492A0;
  border-radius: ${globalBorderProps.radius};
  box-sizing: border-box;

  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};
`;

export const TextArea = styled.textarea`
  background: none;
  border: ${globalBorderProps.size} solid #9492A0;
  border-radius: ${globalBorderProps.radius};
  box-sizing: border-box;

  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};

  resize: vertical;
`;