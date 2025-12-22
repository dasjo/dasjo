import React from "react";
import IndexLayout from "../layouts";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import CompanyAndTags from "../components/CompanyAndTags";

const PostTemplate = ({ data: { airtable: writing } }: any) => {
  const { title, date, text_en } = writing.data;
  const organisation = (writing.data.organisation
    ? writing.data.organisation.map((o: any) => o.data.title)
    : [])[0];

  const tags = writing.data.tags
    ? writing.data.tags.map((t: any) => t.data.name)
    : null;

  const attachments = writing.data.attachments && writing.data.attachments.localFiles ? writing.data.attachments.localFiles.map(
    (a: any) => a.childImageSharp.gatsbyImageData
  ) : null;

  const files = writing.data.files && writing.data.files.localFiles ? writing.data.files.localFiles.map((file: any) => ({
    absolutePath: file.absolutePath,
    relativePath: file.relativePath,
    name: file.name,
    publicURL: file.publicURL,
    extension: file.extension
  })) : [];

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
          {attachments && attachments.map((attachment: any, index: number) => (
            <GatsbyImage key={index} image={attachment} alt={title} />
          ))}
          <h3>Files</h3>
          <ul>
            {files.map((file: any) => (
              <li key={file.absolutePath}>
                <a href={file.publicURL} download>
                  {file.name}{file.extension}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </IndexLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    airtable(data: {slug: { eq: $slug }}) {
      data {
        title
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
        attachments {
          localFiles {
            childImageSharp {
              gatsbyImageData(
                width: 300,
                height: 200,
                layout: CONSTRAINED,
                transformOptions: { fit: INSIDE }
              )
            }
          }
        }
        files {
          localFiles {
            absolutePath
            relativePath
            name
            publicURL
            extension
          }
        }
      }
    }
  }
`;

export default PostTemplate;
