import React from "react";

import styled from "@emotion/styled";
import Josef from "../../resources/josef.jpg";

const StyledHeader = styled.header`
  padding: var(--gutter-huge) 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .text-box {
    flex: 0 0 50%;
    margin-left: var(--gutter-large);
  }

  h1 span {
    font-size: var(--font-size-medium);
  }

  .img-box {
    flex: 1;
  }

  img {
    width: 100%;
  }
`;

const Header = () => (
  <div className="row">
    <StyledHeader role="banner">
      <div className="text-box">
        <h1>
          Josef Dabernig <span>/ dasjo</span>
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
      </div>
      <div className="img-box">
        <img src={Josef} alt="Josef Dabernig" />
      </div>
    </StyledHeader>
  </div>
);

export default Header;
