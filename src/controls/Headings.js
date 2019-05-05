import styled from 'styled-components';
import AppDefaults from '../AppDefaults';

const Title = styled.h1`
  // Only one import statement required
  ${AppDefaults.constants.font.imports.all};

  font-size: ${AppDefaults.constants.font.sizes.title};
  font-family: ${AppDefaults.constants.font.family.default};
`;

const H1 = styled.h1`
  font-size: ${AppDefaults.constants.font.sizes.heading};
  font-family: ${AppDefaults.constants.font.family.default};
`;

const Caption = styled.h1`
  color: #848484;

  font-family: ${AppDefaults.constants.font.family.default};
  font-size: ${AppDefaults.constants.font.sizes.caption};
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

export { Title, H1, Caption, Label };