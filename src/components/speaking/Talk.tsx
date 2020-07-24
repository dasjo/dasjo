import React from 'react';

import Tag from '../Tag';

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
  <div className="card">
    <div>
      <p style={{ marginBottom: '-1rem' }}>
        {new Date(date).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <h3>{title}</h3>
    </div>
    <div className="name-tags">
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
  </div>
);

export default Talk;
