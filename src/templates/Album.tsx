import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
// import { Link } from 'gatsby';
import Img from 'gatsby-image'

import styled from '@emotion/styled';
import CompanyAndTags from '../components/CompanyAndTags';

const StyledAlbumTemplate = styled.article`
    padding: var(--gutter-large-1) 0;

    h1 {
        margin-bottom: var(--gutter-small);
    }

    .date {
        margin-bottom: var(--gutter-small-3);
    }

    .btn--text {
        margin: var(--gutter-small) 0;
    }
  
    .photos {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }

    .container--small {
        margin-bottom: var(--gutter-small);
    }
`;

export const query = graphql`
  query($slug: String!) {
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
    const attachments = album.data.attachments.localFiles.map((a: any) => a.childImageSharp.fluid)
    const organisation = (album.data.organisation
        ? album.data.organisation.map((o: any) => o.data.title)
        : [])[0]
    const tags = album.data.tags ? album.data.tags.map((t: any) => t.data.name) : null

    return (
        <IndexLayout>
            <div className="row">
                <StyledAlbumTemplate>
                    <h1>{album.data.title}</h1>
                    <p className="date">{(new Date(album.data.date)).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="container--small">
                        <CompanyAndTags
                            organisation={organisation}
                            tags={tags}
                        />
                    </div>
                    <div className="photos">
                        {
                            attachments.map((a: any, i: number) => <Img fluid={a} key={i} />)
                        }
                    </div>
                    <a href={album.data.link} className="btn--text" target="_blank">View Full Album <span>&nbsp;&rarr;</span></a>
                </StyledAlbumTemplate>
            </div>
        </IndexLayout>
    );
};

export default AlbumTemplate;
