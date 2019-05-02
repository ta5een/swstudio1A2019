import styled from 'styled-components';
import Defaults from '../AppDefaults';

const textFieldFontSize = Defaults.constants.font.sizes.normal;

const TextField = styled.input`
  border-radius: 5px;
  border: 0.5px solid grey;
  padding: 0.8em;

  font-size: ${textFieldFontSize};
`;

export { TextField };