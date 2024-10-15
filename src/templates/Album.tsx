import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import IndexLayout from "../layouts";
import styled from "@emotion/styled";
import CompanyAndTags from "../components/CompanyAndTags";
import { breakpoints } from "../styles/variables";

const StyledAlbumTemplate = styled.div`
  .photos {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: ${breakpoints.medium}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .photos img {
    max-width: 100%;
    height: auto;
  }
`;

export const query = graphql`
  query ($slug: String!) {
    airtable(data: { slug: { eq: $slug } }) {
      data {
        title
        link
        date
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
        attachments {
          localFiles {
            publicURL
            childImageSharp {
              gatsbyImageData(
                width: 600,
                height: 600,
                layout: CONSTRAINED,
                transformOptions: {
                  fit: COVER,
                  cropFocus: ENTROPY
                }
              )
            }
          }
        }
      }
    }
  }
`;

const AlbumTemplate = ({ data: { airtable: album } }: any) => {
  const attachments = album.data && album.data.attachments && album.data.attachments.localFiles ? 
    album.data.attachments.localFiles.map(
      (a: any) => ({
        gatsbyImageData: a.childImageSharp.gatsbyImageData,
        publicURL: a.publicURL
      })
    ) : null;
  const organisation = (album.data.organisation
    ? album.data.organisation.map((o: any) => o.data.title)
    : [])[0];
  const tags = album.data.tags
    ? album.data.tags.map((t: any) => t.data.name)
    : null;

  return (
    <IndexLayout pageTitle={album.data.title}>
      <div className="row">
        <StyledAlbumTemplate className="template">
          <p>
            {new Date(album.data.date).toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1>{album.data.title}</h1>
          <CompanyAndTags organisation={organisation} tags={tags} />
          <div className="photos">
            {attachments.map((a: any, i: number) => (
              <a href={a.publicURL} key={i} target="_blank" rel="noopener noreferrer">
                <GatsbyImage
                  image={a.gatsbyImageData}
                  alt={album.data.title}
                  objectPosition="50% 50%" // Center the focal point
                />
              </a>
            ))}
          </div>
          <a href={album.data.link} className="btn--text" target="_blank">
            View Full Album <span>&nbsp;&rarr;</span>
          </a>
        </StyledAlbumTemplate>
      </div>
    </IndexLayout>
  );
};

export default AlbumTemplate;
