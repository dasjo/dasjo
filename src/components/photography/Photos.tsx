import React from 'react';

import styled from '@emotion/styled';

const StyledPhotos = styled.section`
  .photos {
    display: flex;
    height: 40rem;
    overflow-x: scroll;
    padding-bottom: var(--gutter-small);
  }
`;

export interface PhotosProps {
  date: string;
  title: string;
  link: string;
  attachments: string[];
  years: string[];
}

const Photos = ({ date, title, link, attachments }: PhotosProps) => (
  <>
    <StyledPhotos>
      <p>{new Date(date).getFullYear()}</p>
      <div className="photos">
        {attachments.map((img: string) => (
          <img src={img} loading="lazy" />
        ))}
      </div>
      <h3>{title}</h3>
      {link}
    </StyledPhotos>
  </>
);

export default Photos;
