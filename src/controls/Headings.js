import styled from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;

export const Title = styled.h1`
  color: #4B2AE8;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.title};

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Caption = styled.h1`
  // color: #9492A0;

  // margin-top: 0px;
  // margin-bottom: 0px;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.caption};
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Heading = styled.h2`
  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.heading};
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Subheading = styled.h2`
  color: #9492A0;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.subheading};
  font-weight: 400;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Label = styled.label`
  color: #9492A0;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};
  font-weight: 500;
  font-variant: small-caps;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;