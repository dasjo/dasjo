import React from 'react'

import styled from '@emotion/styled'
import { breakpoints } from '../styles/variables'
import Tag from './Tag'

const StyledCompanyAndTags = styled.div`
    display: flex;
    justify-content: space-between;

    @media(max-width: ${breakpoints.large}) {
        flex-direction: column;
        .org {
            margin-bottom: var(--gutter-small-2);
        }
    }

    .org {
        margin-right: var(--gutter-small);
    }

    .tags-container {
        display: flex;
        flex-wrap: wrap;

        @media(min-width: calc(${breakpoints.large} + 1px)) {
            justify-content: flex-end;
        }
    }
`

const CompanyAndTags = ({ organisation, tags }: any) => (
    <StyledCompanyAndTags className="name-tags">
        <div className="org">{organisation}</div>
        {tags && 
            <div className="tags-container">
                {tags.map((tag: string, i: number) => (
                    <Tag text={tag} key={i + tag} />
                ))}
            </div>
        }
    </StyledCompanyAndTags>
)

export default CompanyAndTags