import React from "react";

import styled from "@emotion/styled";
import { Link } from "gatsby";

const StyledPager = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: var(--container-small-0);
  margin-top: var(--gutter-large);

  a {
    display: block;
    &:not(:last-of-type) {
      margin-right: var(--gutter-small);
      margin-bottom: var(--gutter-small-3);
    }
  }

  .active {
    cursor: not-allowed;
    pointer-events: none;
    color: inherit;
  }
`;

const Pager = ({ pageContext }: any) => {
  const pages = [];

  for (let i = 1; i < pageContext.numberOfPages; i++) {
    pages.push({
      number: i + 1,
    });
  }

  console.log(pageContext, pageContext.pageNumber);

  return (
    <StyledPager>
      <Link
        activeClassName="active"
        title={"First Page"}
        to="/writing"
        tabIndex={pageContext.pageNumber === 0 ? -1 : 0}
      >
        1
      </Link>
      {pages.map((p: any, i: number) => (
        <Link
          activeClassName="active"
          key={i}
          title={`Page ${p.number}`}
          to={`/writing/${p.number}`}
          tabIndex={p.number - 1 === pageContext.pageNumber ? -1 : 0}
        >
          {p.number}
        </Link>
      ))}
    </StyledPager>
  );
};

export default Pager;
