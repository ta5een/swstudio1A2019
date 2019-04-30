import styled, { css } from 'styled-components'

const buttonTextColor = 'black'
const buttonPrimaryTextColor = 'white'

const buttonColor = 'palevioletred'
const buttonBorderColor = '#d8d8d8'
const buttonHintTextColor = buttonBorderColor
const buttonPrimaryBorderColor = buttonColor

const buttonFontSize = '14px'

const Button = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 0.5px solid ${buttonBorderColor};
  color: ${buttonTextColor};
  margin: 0.5em 1em;
  padding: 0.6em 1.2em;
  box-shadow: none;

  text-align: center;
  font-size: ${buttonFontSize}
  font-weight: 600;

  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;

  &:hover {
    box-shadow: 0px 5px 10px -4px rgba(153,153,153,1);
  }

  ${props => props.primary && css`
    background: ${buttonColor};
    border: 0.5px solid ${buttonPrimaryBorderColor};
    color: ${buttonPrimaryTextColor};
  `}

  ${props => props.hint && css`
    color: ${buttonHintTextColor};
  `}
`;

export default Button;