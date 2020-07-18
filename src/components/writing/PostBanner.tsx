import React from 'react';

import Tag from '../Tag';
import styled from '@emotion/styled';
import PostBannerImage from '../../resources/post-banner.jpg';
import { breakpoints } from '../../styles/variables';
import { Link } from 'gatsby';

const StyledPostBanner = styled.article`
  .wrapper-link {
    display: flex;
    box-shadow: var(--shadow-light);
    text-decoration: none;
    color: inherit;

    @media (max-width: ${breakpoints.medium}) {
      flex-direction: column;
      max-width: 40rem;
      margin: 0 auto;
    }
  }

  .img {
    min-height: 22rem;
    min-width: 22rem;
    background: url(${PostBannerImage});
    background-size: cover;
    background-position: center;
  }

  .text {
    flex: 1;
    padding: var(--gutter-small-1) var(--gutter-small);
    border: var(--border-light-1);
    border-left: none;

    & > * {
      &:not(:last-child) {
        margin-bottom: var(--gutter-small-3);
      }
    }
  }

  .org {
    /* margin: var(--gutter-small-3) 0; */
  }

  .tags-container {
  }

  &:not(:last-of-type) {
    margin-bottom: var(--gutter-large-1);
  }
`;

export interface PostBannerProps {
  date: string;
  title: string;
  slug: string;
  excerpt: string;
  organisation: string;
  tags?: string[];
}

const PostBanner = ({
  date,
  title,
  slug,
  excerpt,
  organisation,
  tags,
}: PostBannerProps) => (
  <StyledPostBanner>
    <Link to={`/writing/${slug}`} className="wrapper-link">
      <div className="img"></div>
      <div className="text">
        <h3>{title}</h3>
        <p>{date}</p>
        <div>
          <div className="org">{organisation}</div>
          <div className="tags-container">
            {tags
              ? tags.map((tag: string, i) => <Tag text={tag} key={i + tag} />)
              : null}
          </div>
        </div>
        <p>{excerpt}</p>
        <Link to={`/writing/${slug}`} className="btn--text">
          Read more <span>&nbsp;&rarr;</span>
        </Link>
      </div>
    </Link>
  </StyledPostBanner>
);

export default PostBanner;
