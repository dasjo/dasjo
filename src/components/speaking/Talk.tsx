import React from 'react';

import Tag from '../Tag';
import { Link } from 'gatsby';

export interface TalkProps {
  date: string;
  title: string;
  notes: string;
  link: string;
  slug: string;
  organisation: string;
  tags: string[];
}

const Talk = ({
  date,
  title,
  notes,
  slug,
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
      <Link to={`/speaking/${slug}`}>
        <h3>{title}</h3>
      </Link>
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
    <Link to={`/speaking/${slug}`} className="btn--text" target="_blank">
        More Info <span>&nbsp;&rarr;</span>
    </Link>
  </div>
);

export default Talk;
