import React from 'react';

import { Global, css } from '@emotion/core';
import HKGrotesk from '../fonts/HKGrotesk-Regular.woff';
import { breakpoints } from './variables';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* ---------------------------------------- */
      /* ----- Basic Setup ----- */
      /* ---------------------------------------- */

      @font-face {
        font-family: 'Hk Grotesk';
        font-style: normal;
        font-weight: 400;
        src: url(${HKGrotesk}) format('woff');
      }

      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }

      :root {
        --font-size-small: 1.5rem;
        --font-size-small-0: 1.3rem;
        --font-size-normal: 1.9rem;
        --font-size-normal-1: 2.1rem;
        --font-size-medium: 4rem;
        --font-size-medium-1: 5rem;
        --font-size-medium-2: 5.5rem;
        --font-size-large: 6rem;

        --font-stack-main: 'Jost', sans-serif;
        --font-stack-sub: 'HK Grotesk', sans-serif;

        --white: #fff;
        --white-0: #fcfdff;
        --off-white: #eee;
        --off-white-1: #f5f5f5;
        --black: #000;
        --black-0: #112211;
        --blue: #1877f2;
        --light-blue: #f4fcff;
        --blue-0: #28aaff;

        --grid-max-width: 1160px;
        --container-small: 800px;
        --container-small-0: 650px;

        --gutter-huge: 12rem;
        --gutter-huge-1: 20rem;
        --gutter-large: 6rem;
        --gutter-large-1: 8rem;
        --gutter-medium: 5rem;
        --gutter-small: 3rem;
        --gutter-small-1: 2rem;
        --gutter-small-2: 1.5rem;
        --gutter-small-3: 1rem;

        --border-light-1: 1px solid var(--off-white);
        --border-light-2: 1px solid var(--off-white-1);
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
          padding: 0 var(--gutter-small);
        }

        @media (max-width: ${breakpoints.small}) {
          padding: 0 var(--gutter-small-2);
        }
      }

      section {
        padding: var(--gutter-huge) 0;
      }

      .container-small {
        max-width: var(--container-small);
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

      /* ---------------------------------------- */
      /* ----- Headlines & Paragraphs ----- */
      /* ---------------------------------------- */

      h1,
      h2,
      h3 {
        line-height: 1.1;
        font-family: var(--font-stack-main);
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

        /* &::after {
          content: '';
          display: block;
          height: 2px;
          width: 12rem;
          background: var(--black-0);
          margin: var(--gutter-small-1) 0 var(--gutter-medium);
        } */
      }

      h3 {
        margin: var(--gutter-small-3) 0 var(--gutter-small-2);
      }

      p + p {
        margin-top: var(--gutter-small);
      }

      /* ---------------------------------------- */
      /* ----- Links & Buttons ----- */
      /* ---------------------------------------- */

      a {
        text-decoration: none;
        cursor: pointer;
      }

      .btn {
        display: inline-block;
        padding: 1.2rem 4rem;
        border: 1px solid var(--black-0);
        color: var(--white);
        background: var(--black-0);
      }

      /* ---------------------------------------- */
      /* ----- Images ----- */
      /* ---------------------------------------- */

      img {
        object-fit: contain;
      }
    `}
  />
);

export default GlobalStyles;
