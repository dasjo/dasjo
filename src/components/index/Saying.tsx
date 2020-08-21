import React from 'react';

import styled from '@emotion/styled';
import { breakpoints } from '../../styles/variables';
import Tag, { TagProps } from '../Tag';

const StyledSaying = styled.div`
  background: var(--white);

  &:not(:last-of-type) {
    margin-bottom: var(--gutter-large-1);
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: var(--gutter-small);

    @media (max-width: ${breakpoints.large}) {
      flex-direction: column;
    }
  }

  .name {
    color: var(--black);
    font-family: var(--font-stack-main);
    font-size: var(--font-size-small);
  }

  .quote {
    font-style: italic;
  }
`;

export interface SayingProps {
  quote: string;
  person: string;
  tags: string[];
  organisation: string[];
}

const Saying = ({ quote, person, tags, organisation }: SayingProps | any) => (
  <StyledSaying className="card">
    <p className="quote">{quote}</p>
    <div className="info">
      <p className="name">
        &mdash; {person}, {organisation}{' '}
      </p>
      <div className="tags">
        {tags.map((tag: TagProps, i: number) => (
          <Tag key={i + tag.name} {...tag} />
        ))}
      </div>
    </div>
  </StyledSaying>
);

export default Saying;
