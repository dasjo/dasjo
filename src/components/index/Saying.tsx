import React from 'react';

import styled from '@emotion/styled';

const StyledSaying = styled.div`
  max-width: var(--container-small);

  &:not(:last-of-type) {
    margin-bottom: var(--gutter-large-1);
  }

  span {
    color: var(--black);
  }
`;

export interface SayingProps {
  quote: string;
  author: string;
}

const Saying = ({ quote, author }: SayingProps) => (
  <StyledSaying>
    <p>{quote}</p>
    <p>
      {author.split(',').map((w, i) => (
        <span key={i + w} style={{ textDecoration: 'underline' }}>
          {w}
          {!(i === author.split(',').length - 1) ? ', ' : ''}
        </span>
      ))}
      .
    </p>
  </StyledSaying>
);

export default Saying;
