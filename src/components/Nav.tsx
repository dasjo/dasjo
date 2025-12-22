import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";
import Logo from "../resources/logo.svg";
import { Global, css } from "@emotion/react";
import { breakpoints } from "../styles/variables";
import { Link } from "gatsby";

const StyledNav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gutter-medium) 0;

  @media(max-width: ${breakpoints.medium}) {
    flex-direction: column;
  }

  img {
    display: block;
    height: 5rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 5rem;
    background: none;
    border: none;

    @media(min-width: calc(${breakpoints.medium} + 1px)) {
      display: none;
    }

    &:hover,
    &:focus {
      .burger {
        &,
        &::before,
        &::after {
          background: var(--blue-0);
        }

        &::before {
          top: -1.1rem;
        }

        &::after {
          top: 1.1rem;
        }
      }
    }

    &.shown {
      .burger {
        background: transparent;

        &::before {
          top: 0;
          transform: rotate(135deg);
        }

        &::after {
          top: 0;
          transform: rotate(-135deg);
        }
      }
    }
  }

  .burger {
    position: relative;
    display: inline-block;
    width: 3.5rem;
    height: 2px;
    background: var(--black-0);
    transition: all .2s;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      display: inline-block;
      width: 3.5rem;
      height: 2px;
      background: var(--black-0);
      transition: all .2s;
    }

    &::before {
      top: -1rem;
    }

    &::after {
      top: 1rem;
    }
  }

  .burger-container {
    @media(max-width: ${breakpoints.medium}) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      svg {
        border: 3px solid;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;

    @media(max-width: ${breakpoints.medium}) {
      display: none;
      position: absolute;
      top: 100%;
      height: calc(100vh - 100%);
      width: 100vw;
      padding-top: var(--gutter-large-1);
      flex-direction: column;
      align-items: center;
      background: var(--white);
      z-index: 1000;

      &.shown {
        display: flex;
      }

      &.hidden {
        display: none;
      }
    }
  }

  li {
    &:not(:last-child) {
      @media (min-width: calc(${breakpoints.medium} + 1px)) {
        margin-right: var(--gutter-medium);
      }

      @media (min-width: calc(${breakpoints.medium} + 1px)) {
        margin-right: var(--gutter-large-1);
      }

      @media(max-width: ${breakpoints.medium}) {
        margin-bottom: var(--gutter-small);
      }
    }
  }

  a {
    color: inherit;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  .link {
    display: block;
    overflow-x: hidden;

    &::after {
      content: '';
      display: block;
      height: 2px;
      margin-top: .5rem;
      width: 100%;
      background: var(--black-0);
      transform: translateX(-100%);
      transition: all .2s;
    }

    &:hover,
    &:focus,
    &--active {
      color: var(--blue-0);
      transition: all .2s;

      &::after {
        background: var(--blue-0);
        transform: translateX(0);
      }
    }

    /* &--active {
      color: var(--blue-0);
      transition: all .2s;

      &::after {

      }
    } */
  }
`;

const Nav = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isShown) {
        setIsShown(false);
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShown]);

  const toggleIsShown = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="row">
      <StyledNav>
        <Global
          styles={css`
            html {
              overflow-y: ${isShown ? "hidden" : ""};
            }
          `}
        />
        <div className="burger-container">
          <Link to="/">
            <img src={Logo} alt="Dasjo" />
          </Link>
          <button
            onClick={toggleIsShown}
            className={`${isShown ? "shown" : ""}`}
            aria-expanded={isShown}
            aria-label={isShown ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="burger"></span>
          </button>
        </div>
        <ul className={isShown ? "shown" : "hidden"}>
          <li>
            <Link className="link" activeClassName="link--active" to="/agile">
              Agile
            </Link>
          </li>
          <li>
            <Link className="link" activeClassName="link--active" to="/drupal">
              Drupal
            </Link>
          </li>
          <li>
            <Link
              className="link"
              activeClassName="link--active"
              to="/community"
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              className="link"
              activeClassName="link--active"
              to="/diversity-&-inclusion"
            >
              Diversity & Inclusion
            </Link>
          </li>
        </ul>
      </StyledNav>
    </div>
  );
};

export default Nav;
