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
`;

// @todo replace name with global constant
const Header = ({ josefImg }: any) => (
  <div className="row">
    <StyledHeader role="banner">
      <div className="text-box">
        <h1>
          Josef Kruckenberg <span>/ dasjo</span>
        </h1>
        {/* <h2>Challenge the impossible!</h2> */}
        <p>
          I am an interdisciplinary team player at the intersection of
          technology, user experience and business. With technical experience,
          analytical skills and empathy, I help teams remove impediments and
          continue their journey to understand and create business value. I
          strive for diversity & inclusion and sustainable, open source
          solutions. Let's improve the status quo using open communication,
          creative tools and validating ideas.
        </p>
        <Link className="btn" to="/contact/">
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
