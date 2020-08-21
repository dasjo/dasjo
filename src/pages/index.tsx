import React from 'react';

import Header from '../components/index/Header';
import IndexLayout from '../layouts';
import { SayingProps } from '../components/index/Saying';
import WhatPeopleSay from '../components/index/WhatPeopleSay';
import { graphql } from 'gatsby';
import { filterByFeatured } from '../utils/helpers';
import Tag, { TagProps } from '../components/Tag';

export const IndexPageQuery = graphql`
  query {
    allAirtable(
      filter: { table: { eq: "Quotes" } }
      sort: { fields: [data___id], order: DESC }
    ) {
      nodes {
        data {
          quote
          featured
          person {
            data {
              title
            }
          }
          organisation {
            data {
              title
            }
          }
          tags {
            data {
              name
            }
          }
        }
      }
    }
    file(relativePath: { eq: "josef.jpg" }) {
      childImageSharp {
        fluid {
          sizes
          src
          srcSet
          aspectRatio
        }
      }
    }
  }
`;

const IndexPage = ({ data }: any) => {
  const sayings: SayingProps[] = filterByFeatured(
    data.allAirtable.nodes.map((saying: any) => ({
      quote: saying.data.quote,
      person: saying.data.person[0].data.title,
      organisation: (saying.data.organisation
        ? saying.data.organisation.map((o: any) => o.data.title)
        : [])[0],
        tags: saying.data.tags ? saying.data.tags.map((tag: TagProps, i: number) => (
          <Tag key={i + tag.name} {...tag} />
          )) : null,
      featured: saying.data.featured,
    }))
  );
  const josefImg = data.file.childImageSharp.fluid;

  return (
    <IndexLayout>
      <>
        <Header josefImg={josefImg} />
        <WhatPeopleSay
          sayings={sayings}
          styles={{
            background: 'var(--white-0)',
            borderTop: 'var(--border-light-1)',
          }}
          rowClass="true"
        />
      </>
    </IndexLayout>
  );
};

export default IndexPage;
