import React from "react";

import styled from "@emotion/styled";
import Logo from "../resources/logo.svg";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gutter-medium) 0;

  img {
    height: 5rem;
  }

  ul {
    display: flex;
    list-style: none;
  }

  li {
    &:not(:last-child) {
      margin-right: 6.5rem;
    }
  }

  a {
    color: inherit;
  }
`;

const Nav = () => (
  <div className="row">
    <StyledNav>
      <img src={Logo} alt="Dasjo" />
      <ul>
        <li>
          <a href="/experience">Experience</a>
        </li>
        <li>
          <a href="/writing">Writing</a>
        </li>
        <li>
          <a href="/speaking">Speaking</a>
        </li>
        <li>
          <a href="/photography">Photography</a>
        </li>
      </ul>
    </StyledNav>
  </div>
);

export default Nav;
