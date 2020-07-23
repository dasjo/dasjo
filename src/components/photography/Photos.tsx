import React from 'react';

import styled from '@emotion/styled';
// import Img from 'gatsby-image'
const StyledPhotos = styled.section`
  .photos {
    display: flex;
    height: 40rem;
    overflow-x: scroll;
    padding-bottom: var(--gutter-small);
  }
`;


const Photos = ({ date, title, link, attachments }: any) => (
  <>
    <StyledPhotos>
      <p>{new Date(date).getFullYear()}</p>
      <div className="photos">
        {attachments.map((img: any) => (
          <img src ={img.src} />
        ))}
      </div>
      <h3>{title}</h3>
      {link}
    </StyledPhotos>
  </>
);

export default Photos;
