import React from 'react';
import styled from '@emotion/styled';

const StyledSaying = styled.div`
  max-width: var(--container-small);
  padding: var(--gutter-small);
  border: var(--border-light-1);
  background: var(--white-0);

  &:not(:last-of-type) {
    margin-bottom: var(--gutter-large-1);
  }

  span {
    color: var(--black);
  }

  .name {
    font-family: var(--font-stack-main);
  }
`;

export interface SayingProps {
  quote: string;
  person: string;
}

const Saying = ({ quote, person }: SayingProps | any) => (
  <StyledSaying>
    <p>{quote}</p>
    <p className="name">&mdash; {person}</p>
  </StyledSaying>
);

export default Saying;
