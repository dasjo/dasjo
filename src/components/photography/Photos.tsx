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
`;

const Photos = ({ date, title, link, attachments }: any) => (
  <>
    <StyledPhotos>
      <p>{new Date(date).getFullYear()}</p>
      <div className="photos">
        {attachments.map((img: any) => (
          <div className="g-image">
            <Img fluid={img} />
          </div>
        ))}
      </div>
      <h3>{title}</h3>
      {link}
    </StyledPhotos>
  </>
);

export default Photos;
