import React from 'react';

import styled from '@emotion/styled';
import { breakpoints } from '../../styles/variables';

const StyledContactForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: var(--container-small);

  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
  }

  & > * {
    margin-bottom: var(--gutter-small);
    font-family: inherit;
    font-size: inherit;
  }

  input, textarea {
    display: block;
    border: none;
    border-bottom: 1px solid;
    padding: .5rem;
  }

  .input--half {
    @media (min-width: calc(${breakpoints.medium} + 1px)) {
      width: 49%;
    }
  }
  .input--full {
    width: 100%;
  }

  textarea {
    width: 100%;
    min-height: 24rem;
    border: 1px solid;
  }
`;

const ContactForm = () => (
  <StyledContactForm name="contact" method="POST" data-netlify="true">
    <input
      aria-label="Enter you Name"
      className="input--half"
      type="text"
      name="name"
      id="name"
      placeholder="Name"
      required
    />
    <input
      aria-label="Enter you Email"
      className="input--half"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      required
    />
    <input
      aria-label="Enter you Name"
      className="input--full"
      type="text"
      name="subject"
      id="subject"
      placeholder="Subject"
    />
    <textarea required name="message" id="message" placeholder="Your Message"></textarea>
    <button className="btn" type="submit">
      Send
    </button>
  </StyledContactForm>
);

export default ContactForm;
