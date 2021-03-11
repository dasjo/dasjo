import React from 'react';

import Header from '../components/index/Header';
import IndexLayout from '../layouts';
import { SayingProps } from '../components/index/Saying';
import WhatPeopleSay from '../components/index/WhatPeopleSay';
import { graphql } from 'gatsby';
import { filterByFeatured } from '../utils/helpers';

export const IndexPageQuery = graphql`{
  allAirtable(
    filter: {table: {eq: "Quotes"}}
    sort: {fields: [data___id], order: DESC}
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
  file(relativePath: {eq: "josef.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        width: 500
        height: 500
        placeholder: BLURRED
        layout: CONSTRAINED
      )
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
      tags: saying.data.tags
        ? saying.data.tags.map((t: any) => t.data.name)
        : null,
      featured: saying.data.featured,
    }))
  );
  const josefImg = data.file.childImageSharp.gatsbyImageData;

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
