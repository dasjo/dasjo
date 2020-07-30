import { Link } from 'gatsby';

import React from 'react'

import styled from '@emotion/styled'

const StyledPager = styled.div`
    max-width: var(--container-small-0);
    margin-top: var(--gutter-large);

    .btn--text {
        &:not(:only-child) { 
            &:first-of-type {
                margin-right: var(--gutter-large);

                &::after {
                    left: 100%;
                    right: 0;
                }

                &:hover {
                    &::after {
                        left: 0;
                    }
                }
            }
        }
    }

    .is-the-only {
        &::after {
            left: 100%;
            right: 0;
        }

        &:hover {
            &::after {
                left: 0;
            }
        }
    }
`

const Pager = ({ pageContext }: any) => {
    const { previousPagePath, nextPagePath } = pageContext;

    return (
        <StyledPager>
            {
                previousPagePath ? (<Link className={`btn--text ${!nextPagePath ? 'is-the-only' : null}`} to={previousPagePath}><span>&larr;&nbsp;</span> Previous</Link>) : null
            }

            {
                nextPagePath ? (<Link className="btn--text" to={nextPagePath}>Next <span>&nbsp;&rarr;</span></Link>) : null
            }
        </StyledPager>
    )
}

export default Pager