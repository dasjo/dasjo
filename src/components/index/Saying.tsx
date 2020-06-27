import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../../styles/variables';

const StyledSaying = styled.div`
  max-width: var(--container-small);
  padding: var(--gutter-small);
  border: var(--border-light-1);
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

  .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    @media (min-width: calc(${breakpoints.large} + 1px)) {
      max-width: 500px;
      justify-content: flex-end;
    }

    @media (max-width: ${breakpoints.large}) {
      margin-top: var(--gutter-small);
    }

    @media(max-width: ${breakpoints.small0}) {
      flex-direction: column;
    }
  }

  .tag {
    display: inline-block;
    padding: 0.2rem 0.8rem;
    color: var(--blue);
    font-size: var(--font-size-small-0);
    border: var(--border-light-2);
    background: var(--light-blue);
    margin-bottom: 1rem;

    @media (min-width: calc(${breakpoints.large} + 1px)) {
      &:not(:first-child) {
        margin-left: 1rem;
      }
    }

    @media(max-width: ${breakpoints.large}) {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  .name {
    color: var(--black);
    font-family: var(--font-stack-main);
  }
`;

export interface SayingProps {
  quote: string;
  person: string;
  tags: string[];
}

const Saying = ({ quote, person, tags }: SayingProps | any) => (
  <StyledSaying>
    <p>{quote}</p>
    <div className="info">
      <p className="name">&mdash; {person}</p>
      <div className="tags">
        {tags.map((tag: any, i: number) => (
          <Link to="/tags/" className="tag" key={tag + i}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  </StyledSaying>
);

export default Saying;
