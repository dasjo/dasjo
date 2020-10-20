import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import Tag from '../components/Tag';
import styled from '@emotion/styled';

const StyledTagsPage = styled.div`
  h1 {
      margin-bottom: var(--gutter-small);
  }

  .container--small {
    display: flex;
    flex-wrap: wrap;

    & > * {
      margin-right: 1.5rem;
      margin-bottom: 1.5rem;
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 0;
      }
    }
  }
`;

export const TagsPageQuery = graphql`
  query {
    allAirtable(filter: { table: { eq: "Tags" } }) {
      nodes {
        data {
          name
        }
      }
    }
  }
`;

const TagsPage = ({ data }: any) => {
  const tags = data.allAirtable.nodes.map((t: any) => t.data.name);
  return (
    <IndexLayout pageTitle="Tags">
      <StyledTagsPage>
        <div className="row">
          <section>
            <h1>Tags</h1>
            <div className="container--small">
              {tags.map((tag: string, i: number) => (
                <Tag
                  text={tag}
                  key={i + tag}
                  styles={{ fontSize: 'var(--font-size-small)' }}
                />
              ))}
            </div>
          </section>
        </div>
      </StyledTagsPage>
    </IndexLayout>
  );
};

export default TagsPage;
