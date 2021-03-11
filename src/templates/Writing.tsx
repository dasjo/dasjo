import React from "react";

import { graphql } from "gatsby";

// import Pager from '../components/pager'
import IndexLayout from "../layouts";
import PostBanner, { PostBannerProps } from "../components/writing/PostBanner";
import Pager from "../components/pager";

export const query = graphql`query ($skip: Int!, $limit: Int!) {
  allAirtable(
    filter: {table: {eq: "Writing"}}
    sort: {fields: [data___date], order: DESC}
    skip: $skip
    limit: $limit
  ) {
    nodes {
      data {
        slug
        title
        link
        date
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
        attachments {
          localFiles {
            childImageSharp {
              gatsbyImageData(width: 400, height: 300, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`;

const WritingPage = ({ data, pageContext }: any) => {
  
  const writings = data.allAirtable.nodes.map((w: any) => ({
    title: w.data.title,
    slug: w.data.slug,
    featured: w.data.featured,
    date: w.data.date,
    excerpt: w.data.text_en ? w.data.text_en.childMarkdownRemark.excerpt : null,
    organisation: (w.data.organisation
      ? w.data.organisation.map((o: any) => o.data.title)
      : [])[0],
    teaser:
      w.data.attachments &&
      w.data.attachments.localFiles &&
      w.data.attachments.localFiles.map((a: any) => {
        return a.childImageSharp.gatsbyImageData;
      })[0],
    tags: w.data.tags ? w.data.tags.map((t: any) => t.data.name) : null,
  }));
  return (
    <IndexLayout pageTitle="Writing">
      <div className="row">
        <section>
          <h1>Writing</h1>
          <section>
            <div className="writings container--small">
              {writings.map((w: PostBannerProps, i: any) => (
                <PostBanner key={i + w.title} {...w} />
              ))}
              <Pager pageContext={pageContext} />
            </div>
          </section>
        </section>
      </div>
    </IndexLayout>
  );
};

export default WritingPage;
