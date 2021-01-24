import React from "react";
import IndexLayout from "../layouts";
import { graphql } from "gatsby";
import CompanyAndTags from "../components/CompanyAndTags";
import Img from "gatsby-image";

export const query = graphql`
  query($slug: String!) {
    airtable(data: { slug: { eq: $slug } }) {
      table
      data {
        slug
        title
        link
        date
        text_en {
          childMarkdownRemark {
            html
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
              fluid(maxWidth: 800, maxHeight: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

const PostTemplate = ({ data: { airtable: writing } }: any) => {
  const { title, date, text_en } = writing.data;
  const organisation = (writing.data.organisation
    ? writing.data.organisation.map((o: any) => o.data.title)
    : [])[0];

  const tags = writing.data.tags
    ? writing.data.tags.map((t: any) => t.data.name)
    : null;

  const attachments = writing.data.attachments && writing.data.attachments.localFiles ? writing.data.attachments.localFiles.map(
    (a: any) => a.childImageSharp.fluid
  ) : null;

  return (
    <IndexLayout pageTitle={title} node={writing}>
      <div className="row">
        <div className="container--small template">
          <p>
            {new Date(date).toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1>{title}</h1>
          <CompanyAndTags organisation={organisation} tags={tags} />
          {text_en ? (
            <div
              dangerouslySetInnerHTML={{
                __html: text_en.childMarkdownRemark.html,
              }}
            />
          ) : null}

          {attachments ? (
          <div className="photos">
            {attachments.map((a: any, i: number) => (
              <Img fluid={a} key={i} />
            ))}
          </div>
          ) : null}

          {writing.data.link ? (
          <a href={writing.data.link} className="btn--text" target="_blank">
            View Original Post <span>&nbsp;&rarr;</span>
          </a>
          ) : null}

        </div>
      </div>
    </IndexLayout>
  );
};

export default PostTemplate;
