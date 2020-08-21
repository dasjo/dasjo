import React from "react";
import IndexLayout from "../layouts";
import { graphql } from "gatsby";
import CompanyAndTags from "../components/CompanyAndTags";
import Tag, { TagProps } from "../components/Tag";

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
`;

const PostTemplate = ({ data: { airtable: writing } }: any) => {
  const { title, date, text_en } = writing.data;
  const organisation = (writing.data.organisation
    ? writing.data.organisation.map((o: any) => o.data.title)
    : [])[0];

  const tags = writing.data.tags ? writing.data.tags.map((tag: TagProps, i: number) => (
    <Tag key={i + tag.name} {...tag} />
    )) : null;

  return (
    <IndexLayout>
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
        </div>
      </div>
    </IndexLayout>
  );
};

export default PostTemplate;
