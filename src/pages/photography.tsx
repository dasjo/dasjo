import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import Photos, { PhotosProps } from '../components/photography/Photos';

export const photographyPageQuery = graphql`
  query {
    allAirtable(filter: { table: { eq: "Photography" } }) {
      nodes {
        data {
          title
          link
          date
          featured
          attachments {
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PhotographyPage = ({ data }: any) => {
  const photos = data.allAirtable.nodes.map((p: any) => ({
    date: p.data.date,
    title: p.data.title,
    link: p.data.link,
    attachments: p.data.attachments.localFiles.map((a: any) => {
      return a.childImageSharp.fluid.src;
    }),
  }));

  let years = data.allAirtable.nodes.map((p: any) =>
    new Date(p.data.date).getFullYear()
  );

  years = [...new Set(years)]; // Remove Duplicate items

  return (
    <IndexLayout>
      <div className="row">
        <section>
          <h1>Photography</h1>
          <div>
            {photos.map((p: PhotosProps) => (
              <Photos {...p} />
            ))}
          </div>
        </section>
      </div>
    </IndexLayout>
  );
};

export default PhotographyPage;
