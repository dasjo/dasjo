import React from "react";
import IndexLayout from "../layouts";
import { graphql } from "gatsby";
import CompanyAndTags from "../components/CompanyAndTags";

export const query = graphql`
  query($slug: String!) {
    airtable(data: { slug: { eq: $slug } }) {
      data {
        title
        date
        notes {
          childMarkdownRemark {
            html
          }
        }
        link
        recording
        slides
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

const Talk = ({ data: { airtable: speaking } }: any) => {
  const {
    title,
    date,
    organisation,
    tags,
    notes,
    link,
    slides,
    recording,
  } = speaking.data;

  const organisationData = (organisation
    ? organisation.map((o: any) => o.data.title)
    : [])[0];

  const tagsData = tags ? tags.map((t: any) => t.data.name) : null;

  return (
    <IndexLayout pageTitle={title} node={speaking}>
      <div className="template">
        <div className="row">
          <div className="container--small">
            <p>
              {new Date(date).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1>{title}</h1>
            <CompanyAndTags organisation={organisationData} tags={tagsData} />
            {notes ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: notes.childMarkdownRemark.html,
                }}
              />
            ) : null}
            <div className="links">
              {link ? (
                <>
                  <a href={link} className="btn--text" target="_blank" rel="noopener noreferrer" aria-label="View talk link (opens in new tab)">
                    Link <span>&nbsp;&rarr;</span>
                  </a>
                  <br />
                </>
              ) : null}
              {slides ? (
                <>
                  <a href={slides} className="btn--text" target="_blank" rel="noopener noreferrer" aria-label="View slides (opens in new tab)">
                    Slides <span>&nbsp;&rarr;</span>
                  </a>
                  <br />
                </>
              ) : null}
              {recording ? (
                <>
                  <a href={recording} className="btn--text" target="_blank" rel="noopener noreferrer" aria-label="View recording (opens in new tab)">
                    Recording <span>&nbsp;&rarr;</span>
                  </a>
                  <br />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
};

export default Talk;
