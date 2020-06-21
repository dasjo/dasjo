import React from "react";

import { Global, css } from "@emotion/core";
import HKGrotesk from "../fonts/HKGrotesk-Regular.woff";

const GlobalStyles = () => (
  <Global
    styles={css`
      /* ---------------------------------------- */
      /* ----- Basic Setup ----- */
      /* ---------------------------------------- */

      @font-face {
        font-family: "Hk Grotesk";
        font-style: normal;
        font-weight: 400;
        src: url(${HKGrotesk}) format("woff");
      }

      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
      }

      :root {
        --font-size-small: 1.8rem;
        --font-size-normal: 2.2rem;
        --font-size-medium: 4rem;
        --font-size-large: 6.5rem;

        --white-0: #fcfdff;

        --grid-max-width: 1160px;

        --gutter-huge: 12rem;
        --gutter-huge-1: 20rem;
        --gutter-large: 6rem;
        --gutter-medium: 5rem;
        --gutter-small: 3rem;
      }

      html {
        font-size: 62.5%;
      }

      body {
        font-size: var(--font-size-normal);
        font-family: "Hk Grotesk", sans-serif;
        font-weight: 400;
        line-height: 1.6;
        background: var(--white-0);
      }

      /* ---------------------------------------- */
      /* ----- Layout Helpers ----- */
      /* ---------------------------------------- */

      .row {
        max-width: var(--grid-max-width);
        width: 100%;
        margin: 0 auto;
      }

      /* ---------------------------------------- */
      /* ----- Headlines & Paragraphs ----- */
      /* ---------------------------------------- */

      h1,
      h2,
      h3 {
        line-height: 1.1;
        font-family: "Jost", sans-serif;
      }

      h1 {
        margin-bottom: var(--gutter-small);
        font-size: var(--font-size-large);
      }

      /* ---------------------------------------- */
      /* ----- Links & Buttons ----- */
      /* ---------------------------------------- */

      a {
        text-decoration: none;
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
