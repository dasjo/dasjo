import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import Photos from '../components/photography/Photos';
import styled from '@emotion/styled';

const StyledPhotoGraphyPage = styled.div`
  .sections {
    section {
      padding: 0 0 var(--gutter-large-1);

      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }
`;

export const photographyPageQuery = graphql`
  query {
    allAirtable(filter: { table: { eq: "Photography" } }) {
      nodes {
        data {
          title
          link
          date
          featured
          slug
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
    slug: p.data.slug,
    image: p.data.attachments.localFiles.map((a: any) => {
      return a.childImageSharp.fluid;
    })[0],
  }));

  const items = [...photos];

  const years = [
    ...new Set( // remove duplicate items
      items
        .map((i: any) => new Date(i.date).getFullYear())
        .sort((a, b) => b - a) // sort the dates in descending order.
    ),
  ];
  const structuredItemsToRender: Entry[] = [];

  interface Entry {
    date: any;
    entries: any[];
  }

  years.map((year: any) => {
    const entry: Entry = {
      date: year,
      entries: [],
    };
    items.map((i: any) => {
      if (new Date(i.date).getFullYear() == year) {
        entry.entries.push(i);
      }
    });
    structuredItemsToRender.push(entry);
  });

  return (
    <IndexLayout>
      <StyledPhotoGraphyPage>
        <div className="row">
          <section>
            <h1>Photography</h1>
            {structuredItemsToRender.map((i: any) => (
              <section className="sections">
                <h2>{i.date}</h2>
                {i.entries.map((entry: any, i: any) => {
                  return <Photos {...entry} key={i} />;
                })}
              </section>
            ))}
          </section>
        </div>
      </StyledPhotoGraphyPage>
    </IndexLayout>
  );
};

export default PhotographyPage;
