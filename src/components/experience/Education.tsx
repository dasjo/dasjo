import React from 'react';

import styled from '@emotion/styled';

const StyledEducattion = styled.div``;

const Educattion = ({ from, to, title, link, organisation }: any) => (
  <StyledEducattion>
    <p>
      {from} - {to ? to : 'now'}
    </p>
    <h3>{title}</h3>
    <a href={`${link}`}>{organisation}</a>
  </StyledEducattion>
);

export default Educattion;
