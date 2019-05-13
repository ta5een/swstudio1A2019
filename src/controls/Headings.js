import styled from 'styled-components';
import AppDefaults from '../AppDefaults';

const Title = styled.h1`
  font-size: ${AppDefaults.constants.font.sizes.title};
  font-family: ${AppDefaults.constants.font.family.default};
`;

const Caption = styled.h1`
  color: #848484;

  margin-top: 0px;
  margin-bottom: 0px;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: ${AppDefaults.constants.font.sizes.caption};
  font-weight: 500;
`;

const Heading = styled.h2`
  font-size: ${AppDefaults.constants.font.sizes.heading};
  font-family: ${AppDefaults.constants.font.family.default};
`;

const Subheading = styled.h2`
  color: #848484;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: ${AppDefaults.constants.font.sizes.subheading};
  font-weight: 500;
`;

const Label = styled.label`
  color: #848484;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: 18px;
  font-variant: small-caps;
  font-weight: 500;
  text-align: left;
`;

export { Title, Caption, Heading, Subheading, Label };