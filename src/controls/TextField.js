import styled, { css } from 'styled-components'

const textFieldFontSize = '14px'

const TextField = styled.input`
  border-radius: 5px;
  border: 0.5px solid grey;
  padding: 0.5em;

  font-size: ${textFieldFontSize};
`;

export { TextField };