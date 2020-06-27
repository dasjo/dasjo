import Header from '../components/index/Header';
import IndexLayout from '../layouts';
import React from 'react';
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
        }
      }
    }
  }
`;

const IndexPage = ({ data }: any) => {
  const sayings: SayingProps[] = data.allAirtable.nodes.map((saying: any) => ({
    quote: saying.data.quote,
    person: saying.data.person[0].data.title,
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
