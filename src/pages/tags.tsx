import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import Tag, { TagProps } from '../components/Tag';
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
          links_count
        }
      }
    }
  }
`;

const TagsPage = ({ data }: any) => {
  const tags = data.allAirtable.nodes.map((t: any) => ({
    name: t.data.name,
    count: t.data.links_count
  }));
  return (
    <IndexLayout>
      <StyledTagsPage>
        <div className="row">
          <section>
            <h1>Tags</h1>
            <div className="container--small">
              {tags.map((tag: TagProps, i: number) => (
                <Tag
                  name={tag.name}
                  count={tag.count}
                  key={i + tag.name}
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
