import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { filterByFeatured } from '../utils/helpers';
import PostBanner, { PostBannerProps } from '../components/writing/PostBanner';

const StyledWritingPage = styled.div`
  .writings {
    padding: var(--gutter-large) 0;
  }
`;

export const WritingPageQuery = graphql`
  query {
    allAirtable(
      filter: { table: { eq: "Writing" } }
      sort: { fields: [data___date], order: DESC }
    ) {
      nodes {
        data {
          title
          slug
          featured
          date
          attachments {
            localFiles {
              childImageSharp {
                fluid {
                  sizes
                  src
                  srcSet
                  aspectRatio
                }
              }
            }
          }
          text_en {
            childMarkdownRemark {
              excerpt
            }
          }
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
        }
      }
    }
  }
`;

const WritingPage = ({ data }: any) => {
  const writings = filterByFeatured(
    data.allAirtable.nodes.map((w: any) => {
      console.log(w.data.attachments);
      return {
        title: w.data.title,
        slug: w.data.slug,
        featured: w.data.featured,
        date: w.data.date,
        attachments: w.data.attachments ? w.data.attacments.localFiles : null,
        excerpt: w.data.text_en
          ? w.data.text_en.childMarkdownRemark.excerpt
          : null,
        organisation: (w.data.organisation
          ? w.data.organisation.map((o: any) => o.data.title)
          : [])[0],
        tags: w.data.tags ? w.data.tags.map((t: any) => t.data.name) : null,
      };
    })
  );

  console.log(writings);
  return (
    <IndexLayout>
      <StyledWritingPage>
        <div className="row">
          <section>
            <h1>Writing</h1>
            <div className="writings container--small">
              {writings.map((w: PostBannerProps, i) => (
                <PostBanner key={i + w.title} {...w} />
              ))}
            </div>
          </section>
        </div>
      </StyledWritingPage>
    </IndexLayout>
  );
};

export default WritingPage;
