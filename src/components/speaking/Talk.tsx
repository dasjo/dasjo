import React from 'react';

import styled from '@emotion/styled';
import Tag from '../Tag';

const StyledTalk = styled.div`
  &:not(:last-of-type) {
    margin-bottom: var(--gutter-large);
  }
`;

export interface TalkProps {
  date: string;
  title: string;
  notes: string;
  link: string;
  slides: string;
  organisation: string;
  tags: string[];
}

const Talk = ({
  date,
  title,
  notes,
  link,
  slides,
  organisation,
  tags,
}: TalkProps) => (
  <StyledTalk>
    <p>{date}</p>
    <h3>
      <a href={link} target="_blank">
        {title}
      </a>
    </h3>
    <div>
      <span>{organisation}</span>
      <div>
        {tags.map((tag: string, i) => (
          <Tag text={tag} key={i + tag} />
        ))}
      </div>
    </div>
    <p>{notes}</p>
    <a href={slides} className="btn" target="_blank">
      Slides
    </a>
  </StyledTalk>
);

export default Talk;
