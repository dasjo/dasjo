import React from 'react';

import styled from '@emotion/styled';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from 'gatsby'

const StyledPhotos = styled.section`
    .gatsby-image-wrapper {
        max-height: 400px;
        max-width: var(--container-small-0);
        margin-bottom: var(--gutter-small);
    }

  .btn--text {
    margin-top: var(--gutter-small-3);
  }
`;

const Photos = ({ title, slug, image }: any) => {
    return <>
        <StyledPhotos>
            <Link to={`/photography/${slug}`} target="_blank">
                <GatsbyImage image={image} alt={title} />
                <h3>{title}</h3>
            </Link>
        </StyledPhotos>
    </>;
}

export default Photos;
