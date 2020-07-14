import React from 'react';

import { Global, css } from '@emotion/core';
import { breakpoints } from './variables';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* ---------------------------------------- */
      /* ----- Basic Setup ----- */
      /* ---------------------------------------- */

      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }

      :root {
        --font-size-small: 1.7rem;
        --font-size-small-0: 1.3rem;
        --font-size-normal: 1.9rem;
        --font-size-normal-1: 2.1rem;
        --font-size-medium: 4rem;
        --font-size-medium-1: 5rem;
        --font-size-medium-2: 5.5rem;
        --font-size-large: 6rem;

        --font-stack-sub: 'HK Grotesk', sans-serif;

        --white: #fff;
        --white-0: #fcfdff;
        --off-white: #eee;
        --off-white-1: #f5f5f5;
        --black: #000;
        --black-0: #112211;
        --blue: #1877f2;
        --blue-0: #28aaff;
        --light-blue: #f4fcff;
        --outline: 2px solid var(--blue-0);

        --grid-max-width: 1160px;
        --container-small: 800px;
        --container-small-0: 650px;

        --gutter-huge: 12rem;
        --gutter-huge-1: 20rem;
        --gutter-large: 6rem;
        --gutter-large-1: 8rem;
        --gutter-medium: 5rem;
        --gutter-medium-1: 4rem;
        --gutter-small: 3rem;
        --gutter-small-1: 2rem;
        --gutter-small-2: 1.5rem;
        --gutter-small-3: 1rem;

        --border-light-1: 1px solid var(--off-white);
        --border-light-2: 1px solid var(--off-white-1);

        --shadow-light: 0 .3rem .7rem rgba(0,0,0, .06);
      }

      html {
        font-size: 62.5%;
        overflow-x: hidden;
        box-sizing: border-box;

        @media (max-width: ${breakpoints.large1}) {
          font-size: 56%;
        }

        @media (max-width: ${breakpoints.small}) {
          font-size: 50%;
        }
      }

      body {
        font-size: var(--font-size-normal);
        font-family: var(--font-stack-sub);
        font-weight: 400;
        line-height: 1.65;
        color: var(--black-0);
        background: var(--white);
      }

      /* ---------------------------------------- */
      /* ----- Layout ----- */
      /* ---------------------------------------- */

      .page-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .row {
        position: relative;
        max-width: var(--grid-max-width);
        width: 100%;
        margin: 0 auto;

        @media (max-width: ${breakpoints.large1}) {
          padding: 0 var(--gutter-large-1);
        }

        @media (max-width: ${breakpoints.medium0}) {
          padding: 0 var(--gutter-medium);
        }

        @media (max-width: ${breakpoints.small1}) {
          padding: 0 var(--gutter-small);
        }
      }

      section {
        padding: var(--gutter-huge) 0;
      }

      .container--small {
        max-width: var(--container-small);
      }

      /* ---------------------------------------- */
      /* ----- Re-usable Components ----- */
      /* ---------------------------------------- */

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

        @media(max-width: ${breakpoints.small1}) {
          flex-direction: column;
        }
      }

      .card {
        padding: var(--gutter-small-1) var(--gutter-small) var(--gutter-small);
        border: var(--border-light-1);
        box-shadow: var(--shadow-light);
        
        &:not(:last-of-type) {
          margin-bottom: var(--gutter-large);
        }

        & > * {
          &:not(:last-child) {
            margin-bottom: var(--gutter-small-2);
          }
        }

        &--off-white {
          background: var(--white-0);
        }

        ul {
          margin: var(--gutter-small-1) 0;
          font-size: var(--font-size-small);
        }

        li {
          &:not(:last-child) {
            margin-bottom: var(--gutter-small-3);
          }

          h1, 
          h2,
          h3,
          h4 {
            display: inline;
          }
        }

        h1 {
          font-size: 130%;
        }
      }

      /* ---------------------------------------- */
      /* ----- Headlines & Paragraphs ----- */
      /* ---------------------------------------- */

      h1,
      h2,
      h3 {
        line-height: 1.1;
      }

      h1 {
        margin-bottom: var(--gutter-small);
        font-size: var(--font-size-large);

        @media (max-width: ${breakpoints.large}) {
          font-size: var(--font-size-medium-2);
        }

        @media (max-width: ${breakpoints.medium0}) {
          font-size: var(--font-size-medium-1);
        }
      }

      h2 {
        font-size: var(--font-size-medium-1);
        margin-bottom: var(--gutter-medium);

        @media (max-width: ${breakpoints.large}) {
          font-size: var(--font-size-medium);
        }

        @media (max-width: ${breakpoints.medium0}) {
          font-size: 3.5rem;
        }

        &::after {
          content: '';
          display: block;
          height: 2px;
          width: 10rem;
          background: var(--black-0);
          margin: var(--gutter-small-1) 0 var(--gutter-medium);
        }
      }

      h3 {
        margin: var(--gutter-small-3) 0 var(--gutter-small-3);
      }

      p + p {
        margin-top: var(--gutter-small-2);
      }

      /* ---------------------------------------- */
      /* ----- Links & Buttons ----- */
      /* ---------------------------------------- */

      a,
      button { 
        cursor: pointer; 

        &::-moz-focus-inner {
            border: 0;
        }
      }

      a {
        text-decoration: none;
        color: var(--blue-0);
        transition: all .2s;

        &:hover,
        &:focus {
          color: var(--blue);
          text-decoration: underline;
        }
      }

      .btn {
        display: inline-block;
        padding: .8rem 3.5rem;
        border: 1px solid var(--black-0);
        color: var(--white);
        background: var(--black-0);
        border-radius: 10rem;

        &:hover,
        &:focus {
          text-decoration: none;
          color: var(--white);
        }
      }

      .btn--text {
        position: relative;
        display: inline-block;
        padding: .5rem;
        color: var(--black-0);
        border-bottom: 1px solid var(--black-0);
        transition: all 0.2s cubic-bezier(1, 0.68, 0.16, 0.9);
        
        span {
          font-family: sans-serif;
        }

        &:focus {
          outline: none;
        }

        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 100%;
          background: var(--white);
          height: 100%;
          z-index: -1;
          transition: all 0.2s cubic-bezier(1, 0.68, 0.16, 0.9);
        }

        &:hover,
        &:focus {
          color: var(--white);
          text-decoration: none;
          &::after {
            right: 0;
            background: var(--black-0);
          }
        }
      }


      /* ---------------------------------------- */
      /* ----- Accessibility ----- */
      /* ---------------------------------------- */


      button:focus,
      input:focus,
      select:focus,
      textarea:focus,
      a:focus {
        outline: 2px solid #9ED3FF;
      }

      body:not(.user-is-tabbing) button:focus,
      body:not(.user-is-tabbing) input:focus,
      body:not(.user-is-tabbing) select:focus,
      body:not(.user-is-tabbing) textarea:focus,
      body:not(.user-is-tabbing) a:focus {
        outline: none;
      }
   
      /* ---------------------------------------- */
      /* ----- Images ----- */
      /* ---------------------------------------- */

      img {
        object-fit: contain;
      }

      /* ---------------------------------------- */
      /* ----- Lists ----- */
      /* ---------------------------------------- */

      ul {
        list-style-position: inside;
      }

      li {
        p {
          display: inline;
        }
      }

    `}
  />
);

export default GlobalStyles;
