import React from 'react';

import styled from '@emotion/styled';

const StyledVolunteering = styled.div``;

const Volunteering = ({ from, to, title, link, organisation }: any) => (
  <StyledVolunteering>
    <p>
      {from} - {to ? to : 'now'}
    </p>
    <h3>{title}</h3>
    <a href={`${link}`}>{organisation}</a>
  </StyledVolunteering>
);

export default Volunteering;
