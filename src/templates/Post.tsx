import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';

import styled from '@emotion/styled';

const StyledPostTemplate = styled.article`
  padding: var(--gutter-huge) 0;

  h2 {
    margin-top: var(--gutter-large);

    &::after {
      margin-bottom: var(--gutter-small-3);
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
        </StyledPostTemplate>
      </div>
    </IndexLayout>
  );
};

export default PostTemplate;
