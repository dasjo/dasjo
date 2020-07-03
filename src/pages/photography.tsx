import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';

export const photographyPageQuery = graphql`
  query {
    allAirtable(filter: { table: { eq: "Photography" } }) {
      nodes {
        data {
          attachments {
            thumbnails {
              full {
                url
              }
            }
          }
          title
          link
          date
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

const PhotographyPage = ({ data }: any) => {
  const photographs = data.allAirtable.nodes
    .map((p: any) => ({
      date: p.data.date,
      title: p.data.title,
      link: p.data.link,
      attachments: p.data.attachments.map((a: any) => {
        return a.thumbnails.full.url;
      }),
      tags: p.data.tags.map((t: any) => t.data.name),
    }))
    .sort();

  return (
    <IndexLayout>
      <div className="row">
        <section>
          <h1>Photography</h1>
          {photographs.map((p: any) => (
            <pre>{JSON.stringify(p, null, 2)}</pre>
          ))}
        </section>
      </div>
    </IndexLayout>
  );
};

export default PhotographyPage;
