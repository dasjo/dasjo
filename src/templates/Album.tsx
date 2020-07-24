import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
// import { Link } from 'gatsby';
import Img from 'gatsby-image'

import styled from '@emotion/styled';

const StyledAlbumTemplate = styled.article`
    padding: var(--gutter-huge) 0;

    .date {
        margin-bottom: var(--gutter-small-3);
    }

    .btn--text {
        margin-bottom: var(--gutter-small);
    }
  
    .photos {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
`;

export const query = graphql`
  query($slug: String!) {
    airtable(data: { slug: { eq: $slug } }) {
      data {
        title
          link
          date
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
`;

const AlbumTemplate = ({ data: { airtable: album } }: any) => {
  const attachments = album.data.attachments.localFiles.map((a: any) =>  a.childImageSharp.fluid)

  return (
    <IndexLayout>
      <div className="row">
        <StyledAlbumTemplate>
        <h1>{album.data.title}</h1>
        <p className="date">{(new Date(album.data.date)).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <a href={album.data.link} className="btn--text" target="_blank">View Full Album <span>&nbsp;&rarr;</span></a>
        <div className="photos">
            {
                attachments.map((a: any, i: number) => <Img fluid={a} key={i}/>)
            }
        </div>
        </StyledAlbumTemplate>
      </div>
    </IndexLayout>
  );
};

export default AlbumTemplate;