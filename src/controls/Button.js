import styled, { css } from 'styled-components'

var BtnClr = Object.freeze({
  default: {
    normal: {
      TEXT: '#000000',
      BACKGROUND: '#ffffff',
      BORDER: '#d8d8d8'
    },
    disabled: {
      TEXT: 'grey',
      BACKGROUND: '#ffffff',
      BORDER: '#d8d8d8'
    }
  },

  primary: {
    normal: {
      TEXT: '#ffffff',
      BACKGROUND: '#1976d2',
      BORDER: '#1976d2'
    },
    disabled: {
      TEXT: '#ffffff',
      BACKGROUND: '#63a4ff',
      BORDER: '#1976d2'
    }
  },

  hint: {
    normal: {
      TEXT: 'grey',
      BACKGROUND: '#ffffff',
      BORDER: 'none'
    },
    disabled: {
      TEXT: 'grey',
      BACKGROUND: '#ffffff',
      BORDER: 'none'
    }
  }
})

// const buttonTextColor = BtnClr.default.normal.TEXT
// const buttonPrimaryTextColor = BtnClr.primary.normal.TEXT

// const buttonBackgroundColor = '#ffffff'
// const buttonDisabledBackgroundColor = ''
// const buttonPrimaryBackgroundColor = '#1976d2'
// const buttonPrimaryDisabledBackgroundColor = '#63a4ff'

// const buttonBorderColor = '#d8d8d8'
// const buttonHintTextColor = 'grey'
// const buttonPrimaryBorderColor = buttonPrimaryBackgroundColor

const buttonFontSize = '14px'
const buttonHintFontSize = '12px'

const Button = styled.button`
  background: ${BtnClr.default.normal.BACKGROUND};
  border-radius: 5px;
  border: 0.5px solid ${BtnClr.default.normal.BORDER};
  color: ${BtnClr.default.normal.TEXT};
  margin: 0.5em 1em;
  padding: 0.6em 1.2em;
  box-shadow: none;

  text-align: center;
  font-size: ${buttonFontSize}
  font-weight: 600;

  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;

  &:hover {
    box-shadow: 0px 5px 10px -4px rgba(153,153,153,1);
  }

  &:disabled {
    color: ${BtnClr.default.disabled.TEXT}
    box-shadow: none;
    cursor: not-allowed;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.BACKGROUND};
    border: 0.5px solid ${BtnClr.primary.normal.BORDER};
    color: ${BtnClr.primary.normal.TEXT};

    &:disabled {
      background: ${BtnClr.primary.disabled.BACKGROUND}
      border: 0.5px solid ${BtnClr.primary.disabled.BORDER};
      color: ${BtnClr.primary.disabled.TEXT}
      box-shadow: none;
      cursor: not-allowed;
    }
  `}

  ${props => props.hint && css`
    background: ${BtnClr.hint.normal.BACKGROUND};
    border: ${BtnClr.hint.normal.BORDER};
    color: ${BtnClr.hint.normal.TEXT};
    
    font-size: ${buttonHintFontSize}
    font-weight: 500;

    &:hover {
      box-shadow: none;
      font-weight: 600;
    }
  `}
`;

export default Button;