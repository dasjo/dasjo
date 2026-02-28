import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { breakpoints } from '../../styles/variables';

const StyledFeaturedWork = styled.section`
  padding: var(--gutter-large-1) 0;
  background: var(--gray-0);
  border-top: var(--border-light-1);
  border-bottom: var(--border-light-1);

  .featured-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--gutter-large-1);
    margin-bottom: var(--gutter-large-1);

    @media (max-width: ${breakpoints.medium}) {
      grid-template-columns: 1fr;
      gap: var(--gutter-medium);
    }
  }

  .featured-card {
    background: var(--white-0);
    padding: var(--gutter-medium);
    border-radius: 4px;
    border-left: 4px solid var(--blue-0);
    transition: all 0.2s;

    &:hover,
    &:focus {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: var(--font-size-base);
      margin-bottom: var(--gutter-small);
      color: var(--blue-0);
    }

    p {
      font-size: 0.9rem;
      color: var(--gray-2);
      margin-bottom: var(--gutter-small);
    }

    .card-label {
      display: inline-block;
      background: var(--blue-0);
      color: var(--white-0);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: var(--gutter-small);
    }

    a {
      color: var(--blue-0);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }

  .cta-section {
    text-align: center;
    padding-top: var(--gutter-medium);

    a {
      display: inline-block;
      margin: 0 var(--gutter-small);
      font-weight: 600;
      color: var(--blue-0);
      text-decoration: none;
      transition: all 0.2s;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
`;

const FeaturedWork = () => (
  <StyledFeaturedWork className="row" role="region" aria-label="Featured Work">
    <div>
      <h2 style={{ marginBottom: 'var(--gutter-large-1)' }}>Featured Work</h2>

      <div className="featured-container">
        <div className="featured-card">
          <div className="card-label">Speaking</div>
          <h3>Explore My Talks</h3>
          <p>
            39+ presentations on open-source leadership, AI strategy, and team scaling 
            at DrupalCon, regional conferences, and enterprise forums.
          </p>
          <Link to="/speaking">View all talks →</Link>
        </div>

        <div className="featured-card">
          <div className="card-label">Writing</div>
          <h3>Latest Articles</h3>
          <p>
            In-depth perspectives on building teams for hard problems, 
            sustainable open-source, and product strategy.
          </p>
          <Link to="/writing">Read the blog →</Link>
        </div>

        <div className="featured-card">
          <div className="card-label">Work</div>
          <h3>Case Studies</h3>
          <p>
            Real outcomes from scaling teams, building open-source platforms, 
            and navigating enterprise AI adoption.
          </p>
          <Link to="/experience">See what I've built →</Link>
        </div>
      </div>

      <div className="cta-section">
        <p>Ready to work together?</p>
        <Link className="btn btn--primary" to="/contact/">
          Let's talk
        </Link>
      </div>
    </div>
  </StyledFeaturedWork>
);

export default FeaturedWork;
