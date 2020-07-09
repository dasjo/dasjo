import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../styles/variables';

const StyledTag = styled(Link)`
    display: inline-block;
    padding: 0.2rem 0.8rem;
    color: var(--blue);
    font-size: var(--font-size-small-0);
    border: var(--border-light-2);
    background: var(--light-blue);
    margin-bottom: 1rem;
    transition: all .2s;

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

    &:hover,
    &:focus {
      background: var(--blue-0);
      color: var(--white);
      text-decoration: none;
    }
`;

export interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => <StyledTag to="/tags/">{text}</StyledTag>;

export default Tag;
