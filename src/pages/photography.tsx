import React from 'react';
import IndexLayout from '../layouts';
import SectionPhotography from '../components/photography/SectionPhotography';
import { graphql } from 'gatsby';

export const photographyPageQuery = graphql`
  query {
    allAirtable(filter: { table: { eq: "Photography" } }) {
      nodes {
        data {
          attachments {
            thumbnails {
              large {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const PhotographyPage = ({ data }: any) => {
  console.log(data);
  return (
    <IndexLayout>
      <div className="row">
        <SectionPhotography photographs={data.allAirtable.nodes} />
      </div>
    </IndexLayout>
  );
};

export default PhotographyPage;
