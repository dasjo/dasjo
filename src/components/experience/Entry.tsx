import React from 'react';

import styled from '@emotion/styled';

const StyledWork = styled.div`
  &:not(:last-of-type) {
    margin-bottom: var(--gutter-large);
  }

  a {
    text-decoration: underline;
  }
`;

const Work = ({ from, to, title, link, roles, organisation }: any) => (
  <StyledWork>
    <p>
      {new Date(from).getFullYear()}
      {to ? ` - ${new Date(from).getFullYear()}` : to !== undefined && ' - now'}
    </p>
    <h3>{title}</h3>
    {organisation ? (
      <a href={`${link}`} target="_blank">
        {organisation}
      </a>
    ) : null}
    <div>
      {roles
        ? roles.map((role: string) => <span key={role}>{role}</span>)
        : null}
    </div>
  </StyledWork>
);

export default Work;
