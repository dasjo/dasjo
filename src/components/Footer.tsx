import React from "react";

import styled from "@emotion/styled";
import { Link } from "gatsby";
import { breakpoints } from "../styles/variables";

const StyledFooter = styled.footer`
  padding: var(--gutter-large-1) 0;
  text-align: center;
  background: var(--black-0);
  color: var(--white);

  .links {
    display: flex;
    justify-content: space-between;
    max-width: 50rem;
    margin: 0 auto var(--gutter-medium);
    list-style: none;

    @media (max-width: ${breakpoints.small0}) {
      flex-direction: column;

      li:not(:last-child) {
        margin-bottom: var(--gutter-small-1);
      }
    }

    a {
      color: #7cd9ff;
    }
  }
`;

const Footer = () => (
  <StyledFooter role="footer">
    <div className="row">
      <ul className="links">
        <li>
          <Link
            className="link"
            activeClassName="link--active"
            to="/experience"
          >
            Experience
          </Link>
        </li>
        <li>
          <Link className="link" activeClassName="link--active" to="/writing">
            Writing
          </Link>
        </li>
        <li>
          <Link className="link" activeClassName="link--active" to="/speaking">
            Speaking
          </Link>
        </li>
        <li>
          <Link
            className="link"
            activeClassName="link--active"
            to="/photography"
          >
            Photography
          </Link>
        </li>
      </ul>
      <p>&copy; 2020 Josef Dabernig.</p>
    </div>
  </StyledFooter>
);

export default Footer;
