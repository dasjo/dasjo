import React from 'react';
import IndexLayout from '../layouts';

import styled from '@emotion/styled';
import { Link } from 'gatsby';

const StyledNotFound = styled.div`
  .btn--text {
    margin-top: var(--gutter-small);
  }
`;

const NotFound = () => (
  <IndexLayout>
    <StyledNotFound>
      <div className="row">
        <section>
          <h1>404! Not Found.</h1>
          <p>
            Sorry! this page can't be found <span aria-hidden={true}>😥</span>.
          </p>
          <Link to="/" className="btn--text">
            Back to Home <span>&nbsp;&rarr;</span>
          </Link>
        </section>
      </div>
    </StyledNotFound>
  </IndexLayout>
);

export default NotFound;
