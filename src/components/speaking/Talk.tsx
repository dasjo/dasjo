import React from 'react';

import styled from '@emotion/styled';
import Tag from '../Tag';

const StyledTalk = styled.div`
  .org {
    margin-top: var(--gutter-small-2);
  }

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
  <StyledTalk className="card card--off-white">
    <p>{date}</p>
    <h3>
      <a href={link} target="_blank">
        {title}
      </a>
    </h3>
    <div>
      <span>{organisation}</span>
      <div className="org">
        {tags.map((tag: string, i) => (
          <Tag text={tag} key={i + tag} />
        ))}
      </div>
    </div>
    <div className="notes" dangerouslySetInnerHTML={{ __html: notes }}></div>
    <a href={slides} className="btn" target="_blank">
      Slides
    </a>
  </StyledTalk>
);

export default Talk;
