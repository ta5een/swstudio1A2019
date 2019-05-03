import styled from 'styled-components';
import Defaults from '../AppDefaults';

const textFieldFontSize = Defaults.constants.font.sizes.normal;

const TextField = styled.input`
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-size: ${textFieldFontSize};
`;

export { TextField };