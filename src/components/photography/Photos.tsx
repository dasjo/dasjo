import React from 'react';

import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { breakpoints } from '../../styles/variables';
const StyledPhotos = styled.section`
  .photos {
    display: flex;
    height: 45rem;
    overflow-x: scroll;
    padding-bottom: var(--gutter-small);
  }

  .g-image {
    min-width: 350px;

    @media (max-width: ${breakpoints.medium0}) {
      min-width: 300px;
    }

    @media (max-width: ${breakpoints.medium}) {
      min-width: 280px;
    }

    @media (max-width: ${breakpoints.small}) {
      min-width: 80%;
    }

    .gatsby-image-wrapper {
      height: 100%;
      width: 100%;
    }
  }

  .btn--text {
    margin-top: var(--gutter-small-3);
  }
`;

const Photos = ({ title, link, attachments }: any) => (
  <>
    <StyledPhotos>
      <div className="photos">
        {attachments.map((img: any) => (
          <div className="g-image">
            <Img fluid={img} />
          </div>
        ))}
      </div>
      <h3>{title}</h3>
      <a href={link} target="_blank" className="btn--text">
        View Full Album<span>&nbsp;&rarr;</span>
      </a>
    </StyledPhotos>
  </>
);

export default Photos;
