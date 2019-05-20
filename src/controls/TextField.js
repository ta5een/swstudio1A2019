import styled from 'styled-components';
import AppDefaults from '../AppDefaults';

const textFieldFontSize = AppDefaults.constants.font.sizes.normal;

export const TextField = styled.input`
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: ${textFieldFontSize};
`;

export const TextArea = styled.textarea`
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: ${textFieldFontSize};

  resize: vertical;
`;