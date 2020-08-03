import React from 'react';

import styled from '@emotion/styled';
import PostBannerImage from '../../resources/post-banner.jpg';
import { breakpoints } from '../../styles/variables';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import CompanyAndTags from '../CompanyAndTags';

const StyledPostBanner = styled.article`
  .wrapper {
    display: flex;
    box-shadow: var(--shadow-light);
    text-decoration: none;
    color: inherit;

    @media (max-width: ${breakpoints.medium}) {
      flex-direction: column;
      max-width: 40rem;
    }

    @media(max-width: ${breakpoints.small}) {
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

  .g-image {
    min-height: 22rem;
    min-width: 22rem;

    .gatsby-image-wrapper {
      height: 100%;
      width: 100%;
    }
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
    tags: string[];
    teaser?: any;
}

const PostBanner = ({
    date,
    title,
    slug,
    excerpt,
    organisation,
    tags,
    teaser,
}: PostBannerProps) => (
        <StyledPostBanner>
            <div className="wrapper">
                {teaser ? (
                    <Link to={`/writing/${slug}`} className="g-image">
                        <Img fluid={teaser} />
                    </Link>
                ) : (
                        <div className="img"></div>
                    )}
                <div className="text">
                    <Link to={`/writing/${slug}`}><h3>{title}</h3></Link>
                    <p>
                        {new Date(date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <CompanyAndTags
                        organisation={organisation}
                        tags={tags}
                    />
                    <p>{excerpt}</p>
                    <Link to={`/writing/${slug}`} className="btn--text">
                        Read more <span>&nbsp;&rarr;</span>
                    </Link>
                </div>
            </div>
        </StyledPostBanner>
    );
export default PostBanner;
