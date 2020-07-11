import React from 'react';

import styled from '@emotion/styled';

const StyledWork = styled.div`
  a {
    text-decoration: underline;
  }
  .roles {
    margin-top: var(--gutter-small-2);
    font-size: 1.8rem;
  }
`;

const Work = ({ from, to, title, link, roles, organisation }: any) => (
  <StyledWork className="card card--off-white">
    <p>
      {new Date(from).getFullYear()}
      {to ? ` - ${new Date(to).getFullYear()}` : to !== undefined && ' - now'}
    </p>
    <h3>{title}</h3>
    {organisation ? (
      <a href={`${link}`} target="_blank">
        {organisation}
      </a>
    ) : null}
    <div className="roles">
      {roles
        ? roles.map((role: string, i: number) => (
            <>
              <span key={role + i} className="role">
                {role}
              </span>
              {i < roles.length - 1 && ', '}
            </>
          ))
        : null}
    </div>
  </StyledWork>
);

export default Work;
