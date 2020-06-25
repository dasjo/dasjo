import React from 'react';

import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  padding: var(--gutter-large-1) 0;
  text-align: center;
  background: var(--black-0);
  color: var(--white);
`;

const Footer = () => (
  <StyledFooter role="footer">
    <div className="row">
      <p>&copy; 2020 Josef Dabernig.</p>
    </div>
  </StyledFooter>
);

export default Footer;
