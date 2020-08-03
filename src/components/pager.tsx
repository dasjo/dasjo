// import { Link } from 'gatsby';

import React from 'react'

import styled from '@emotion/styled'
import { Link } from 'gatsby'

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
       text-decoration: underline;
   } 
`

const Pager = ({ pageContext }: any) => {
    const pages = []

    for (let i = 1; i < pageContext.numberOfPages - 1; i++) {
        pages.push({
            number: i + 1,
        })
    }
    return (
        <StyledPager>
            Page:&nbsp;&nbsp;<Link activeClassName="active" title={'First Page'} to="/writing">First</Link>
            {pages.map(
                (p: any, i: number) => ( 
                <Link activeClassName="active" 
                    key={i}
                    title={`Page ${p.number}`}
                    to={`/writing/${p.number}`}
                >
                    {p.number}
                </Link> )
            )}
            <Link activeClassName="active" title={'Last Page'} to={`/writing/${pageContext.numberOfPages}`}>Last</Link>
        </StyledPager>
    )
}

export default Pager