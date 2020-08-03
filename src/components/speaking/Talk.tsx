import React from 'react';

import { Link } from 'gatsby';
import CompanyAndTags from '../CompanyAndTags';

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
    <CompanyAndTags 
        organisation={organisation}
        tags={tags}
    />
    <div className="notes" dangerouslySetInnerHTML={{ __html: notes }}></div>
    <Link to={`/speaking/${slug}`} className="btn--text" target="_blank">
        More Info <span>&nbsp;&rarr;</span>
    </Link>
  </div>
);

export default Talk;
