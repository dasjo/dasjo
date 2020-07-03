import React from 'react';

import styled from '@emotion/styled';

const StyledWork = styled.div``;

const Work = ({ from, to, title, link, roles, organisation }: any) => (
  <StyledWork>
    <p>
      {from} - {to ? to : 'now'}
    </p>
    <h3>{title}</h3>
    <a href={`${link}`}>{organisation}</a>
    <div>
      {roles.map((role: string) => (
        <span key={role}>{role}</span>
      ))}
    </div>
  </StyledWork>
);

export default Work;
