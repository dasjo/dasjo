import React from 'react';

import IndexLayout from '../layouts';
import Header from '../components/index/Header';
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
        }
      }
    }
  }
`;

const IndexPage = ({ data }: any) => (
  <IndexLayout>
    <>
      <Header />
      <WhatPeopleSay />
      <section className="row" style={{ fontSize: '70%' }}>
        {data.allAirtable.nodes.map((p: any) => (
          <pre>{JSON.stringify(p, null, 2)}</pre>
        ))}
      </section>
    </>
  </IndexLayout>
);

export default IndexPage;
