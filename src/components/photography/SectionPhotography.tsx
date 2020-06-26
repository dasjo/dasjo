import React from 'react';

import styled from '@emotion/styled';

const StyledSectionPhotography = styled.section``;

const SectionPhotography = ({ photographs }: any) => (
  <StyledSectionPhotography>
    <h1>Photography</h1>
    {photographs.map((p: any) => (
      <pre>{JSON.stringify(p, null, 2)}</pre>
    ))}
  </StyledSectionPhotography>
);

export default SectionPhotography;
