import React from "react";
import IndexLayout from "../layouts";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import styled from "@emotion/styled";
import CompanyAndTags from "../components/CompanyAndTags";
import { breakpoints } from "../styles/variables";

const StyledAlbumTemplate = styled.article`
  .photos {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: ${breakpoints.medium}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .container--small {
    margin-bottom: var(--gutter-small);
  }
`;

export const query = graphql`query ($slug: String!) {
  airtable(data: {slug: {eq: $slug}}) {
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
          childImageSharp {
            gatsbyImageData(width: 400, height: 400, layout: CONSTRAINED)
          }
        }
      }
    }
  }
}
`;

// @todo centrally define image component

const AlbumTemplate = ({ data: { airtable: album } }: any) => {
  const attachments = album.data && album.data.attachments && album.data.attachments.localFiles ? 
    album.data.attachments.localFiles.map(
      (a: any) => a.childImageSharp.gatsbyImageData
    ) : null;
  const organisation = (album.data.organisation
    ? album.data.organisation.map((o: any) => o.data.title)
    : [])[0];
  const tags = album.data.tags
    ? album.data.tags.map((t: any) => t.data.name)
    : null;

  // @todo centrally define date component with locale
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
              <GatsbyImage image={a} key={i} alt={album.data.title} />
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
