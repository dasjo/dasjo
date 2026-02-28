import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../../styles/variables';
import { GatsbyImage } from "gatsby-plugin-image";

const StyledHeader = styled.header`
  padding: var(--gutter-large-1) 0 var(--gutter-large-1);
  display: flex;
  
  @media(min-width: calc(${breakpoints.large0} + 1px)) {
    align-items: center;
  }

  @media (max-width: ${breakpoints.large0}) {
    flex-direction: column-reverse;
  }

  .text-box {
    @media(min-width: calc(${breakpoints.large0} + 1px)) {
      flex: 0 0 60%;
      margin-right: var(--gutter-large-1);
    }

    @media(max-width: ${breakpoints.large0}) {
      max-width: var(--container-small-0);
    }
  }

  h1 {
    margin-bottom: var(--gutter-small);
  }

  h1 span {
    font-size: var(--font-size-medium);
  }

  h2 {
    font-size: var(--font-size-large);
    font-weight: 700;
    color: var(--blue-0);
    margin-bottom: var(--gutter-medium);
    line-height: 1.3;
  }

  .img-box {
    flex: 1;

    @media(max-width: ${breakpoints.large0}) {
      max-width: 40rem;
      margin-bottom: var(--gutter-medium);
    }

    @media(max-width: ${breakpoints.small}) {
      max-width: 100%;
      margin-bottom: var(--gutter-small);
    }
  }

  p {
    margin-bottom: var(--gutter-small);
  }

  .btn {
    display: inline-block;
    padding: var(--gutter-small) var(--gutter-medium);
    background: var(--blue-0);
    color: var(--white);
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    margin-top: var(--gutter-small);

    &:hover,
    &:focus {
      background: var(--black-0);
      transform: translateY(-2px);
    }

    &--primary {
      background: var(--blue-0);
    }
  }
`;

// @todo replace name with global constant
const Header = ({ josefImg }: any) => (
  <div className="row">
    <StyledHeader role="banner">
      <div className="text-box">
        <h1>
          Josef Kruckenberg <span>/ dasjo</span>
        </h1>
        <h2>I help technical teams ship products that matter — faster, cheaper, with higher adoption rates.</h2>
        <p>
          I work at the intersection of technology, user experience, and business strategy. 
          With 15+ years of experience spanning open-source leadership, enterprise product strategy, 
          and team scaling, I help remove the friction that slows teams down.
        </p>
        <p>
          If your team is wrestling with: <strong>culture scaling, technical debt, open-source stewardship, 
          or sustainable product strategy</strong> — let's talk.
        </p>
        <Link className="btn btn--primary" to="/contact/">
          Get in touch
        </Link>
      </div>
      <div className="img-box">
        <GatsbyImage image={josefImg} alt="Josef Kruckenberg Portrait. Image by Boris Baldinger" />
      </div>
    </StyledHeader>
  </div>
);

export default Header;
