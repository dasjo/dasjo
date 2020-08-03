import React from 'react';

import styled from '@emotion/styled';
import CompanyAndTags from '../CompanyAndTags';

const StyledWork = styled.div`
  h3 {
    max-width: 600px;
  }

  .roles {
    margin-top: var(--gutter-small-2);
    font-size: 1.8rem;
  }

  li {
      position: relative;
      list-style: none;
      padding-left: 2rem;

      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        display: inline-block;
        height: .8rem;
        width: .8rem;
        background: var(--black-0);
        border-radius: 50%;
      }
  }
`;

const Work = ({ from, to, title, notes, tags, organisation }: any) => (
    <StyledWork className="card card--off-white">
        <p>
            {new Date(from).getFullYear()}
            {to ? ` - ${new Date(to).getFullYear()}` : to !== undefined && ' - now'}
        </p>
        <h3>
            {title}
        </h3>
        <CompanyAndTags 
            organisation={organisation}
            tags={tags}
        />
        <div dangerouslySetInnerHTML={{ __html: notes }} />
    </StyledWork>
);

export default Work;
