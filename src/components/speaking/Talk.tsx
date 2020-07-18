import React from 'react';

import styled from '@emotion/styled';
import Tag from '../Tag';

const StyledTalk = styled.div`
  .org {
    margin-bottom: var(--gutter-small-2);
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
  slides,
  organisation,
  tags,
}: TalkProps) => (
  <StyledTalk className="card">
    <div>
      <p>{date}</p>
      <h3>{title}</h3>
    </div>
    <div>
      <div className="org">{organisation}</div>
      <div>
        {tags.map((tag: string, i) => (
          <Tag text={tag} key={i + tag} />
        ))}
      </div>
    </div>
    <div className="notes" dangerouslySetInnerHTML={{ __html: notes }}></div>
    <a href={slides} className="btn--text" target="_blank">
      Slides <span>&nbsp;&rarr;</span>
    </a>
  </StyledTalk>
);

export default Talk;
