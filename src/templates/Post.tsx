import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import styled from '@emotion/styled';

const StyledPostTemplate = styled.article`
  padding: var(--gutter-huge) 0;

  h2 {
    margin: var(--gutter-large) 0 var(--gutter-small);

    &::after {
      margin-bottom: var(--gutter-small-1);
    }
  }

  h3 {
    margin-top: var(--gutter-small);
  }

  p + p {
    margin-top: var(--gutter-small);
  }

  ul {
    margin: var(--gutter-small-1) 0;
    font-size: var(--font-size-small);
  }

  li {
    &:not(:last-child) {
      margin-bottom: var(--gutter-small-3);
    }
  }

  & > * {
    &:not(:last-child) {
      margin-bottom: var(--gutter-small-2);
    }
  }
`;

export const query = graphql`
  query($slug: String!) {
    airtable(data: { slug: { eq: $slug } }) {
      table
      data {
        slug
        title
        text_en {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

const PostTemplate = ({ data: { airtable: writing } }: any) => {
  const { title, text_en } = writing.data;

  return (
    <IndexLayout>
      <div className="row">
        <StyledPostTemplate className="container--small">
          <h1>{title}</h1>
          {text_en ? (
            <div
              dangerouslySetInnerHTML={{
                __html: text_en.childMarkdownRemark.html,
              }}
            />
          ) : null}
          <Link to="/writing/" className="btn--text">
            Back to Writings <span>&nbsp;&rarr;</span>
          </Link>
        </StyledPostTemplate>
      </div>
    </IndexLayout>
  );
};

export default PostTemplate;
