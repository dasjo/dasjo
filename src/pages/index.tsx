import React from 'react';

import Header from '../components/index/Header';
import IndexLayout from '../layouts';
import { SayingProps } from '../components/index/Saying';
import WhatPeopleSay from '../components/index/WhatPeopleSay';
import { graphql } from 'gatsby';

export const IndexPageQuery = graphql`
  query {
    allAirtable(filter: { table: { eq: "Quotes" } }) {
      nodes {
        data {
          quote
          person {
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
  }
`;

const IndexPage = ({ data }: any) => {
  const sayings: SayingProps[] = data.allAirtable.nodes.map((saying: any) => ({
    quote: saying.data.quote,
    person: saying.data.person[0].data.title,
    tags: saying.data.tags.map((t: any) => t.data.name),
  }));

  return (
    <IndexLayout>
      <>
        <Header />
        <WhatPeopleSay sayings={sayings} />
      </>
    </IndexLayout>
  );
};

export default IndexPage;
