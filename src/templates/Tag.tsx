import React from "react";

import IndexLayout from "../layouts";
import { graphql, Link } from "gatsby";
import { deHyphenate } from "../utils/helpers";
import { GatsbyImage } from "gatsby-plugin-image";

import styled from "@emotion/styled";
import { breakpoints } from "../styles/variables";

const StyledTag = styled.div`
  section {
    padding: var(--gutter-large) 0 0;

    &:last-of-type {
      padding-bottom: var(--gutter-large);
    }
  }

  .banner {
    .img {
      max-width: 350px;
      margin: var(--gutter-large) 0 var(--gutter-small);
    }
  }

  .about {
    margin-top: var(--gutter-small);
  }

  .link-container {
    a {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &:not(:last-child) {
      margin-bottom: var(--gutter-small-2);
    }
  }

  .images-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: var(--gutter-large);

    @media (max-width: ${breakpoints.medium}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.medium0}) {
      grid-template-columns: repeat(1, 1fr);
    }

    .g-image {
      max-height: 150px;
      min-width: 22rem;
      overflow-y: hidden;

      @media (max-width: ${breakpoints.medium}) {
        max-height: 160px;
      }

      @media (max-width: ${breakpoints.medium0}) {
        max-width: 300px;
      }

      .gatsby-image-wrapper {
        height: 100%;
        width: 100%;
      }
    }

    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }
`;

export const query = graphql`query ($name: String) {
  tag: airtable(data: {name: {eq: $name}}) {
    data {
      about
      image {
        localFiles {
          childImageSharp {
            gatsbyImageData(width: 400, height: 300, layout: CONSTRAINED)
          }
        }
      }
    }
  }   
  work: allAirtable(
    filter: {table: {eq: "Work"}, data: {tags: {elemMatch: {data: {name: {eq: $name}}}}}}
    sort: {fields: [data___date], order: DESC}
  ) {
    nodes {
      table
      data {
        title
        location {
          data {
            title
          }
        }
        organisation {
          data {
            title
          }
        }
        from
        to
      }
    }
  }
  speaking: allAirtable(
    filter: {table: {eq: "Speaking"}, data: {tags: {elemMatch: {data: {name: {eq: $name}}}}}}
    sort: {fields: [data___date], order: DESC}
  ) {
    nodes {
      table
      data {
        title
        date
        slug
      }
    }
  }
  writing: allAirtable(
    filter: {table: {eq: "Writing"}, data: {tags: {elemMatch: {data: {name: {eq: $name}}}}}}
    sort: {fields: [data___date], order: DESC}
  ) {
    nodes {
      table
      data {
        title
        slug
        date
      }
    }
  }
  photography: allAirtable(
    filter: {table: {eq: "Photography"}, data: {tags: {elemMatch: {data: {name: {eq: $name}}}}}}
  ) {
    nodes {
      table
      data {
        link
        date
        slug
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

const TagTemplate = ({ location, data }: any) => {
  const about = data.tag && data.tag.data ? data.tag.data.about : null;
  // Get the first image from the localFiles array
  let tagImage = null;
  if (data.tag && data.tag.data && data.tag.data.image && data.tag.data.image.localFiles) {
    for (const file of data.tag.data.image.localFiles) {
      if (file.childImageSharp) {
        tagImage = file.childImageSharp.gatsbyImageData;
        break;
      }
    }
  }
  const works: any[] = [];
  if (data.work.nodes.length) {
    data.work.nodes.forEach((work: any) => {
      const fromYear = new Date(work.data.from).getFullYear();
      const toYear = work.data.to ? new Date(work.data.to).getFullYear() : null;
      const entry = {
        table: "work",
        location: work.data.location && work.data.location[0] && work.data.location[0].data && work.data.location[0].data.title ? work.data.location[0].data.title : null,
        org: work.data.organisation && work.data.organisation[0] && work.data.organisation[0].data && work.data.organisation[0].data.title ? work.data.organisation[0].data.title : null,
      }
      work.title = work.data.title + " @ " + entry.org + ", " + entry.location;
      if (toYear === null || fromYear != toYear) {
        works.push(Object.assign({}, entry, {date: work.data.from, title: "Started " + work.title}));
        // Only add "Finished" entry if the work has an end date
        if (toYear !== null) {
          works.push(Object.assign({}, entry, {date: work.data.to, title: "Finished " + work.title}));
        }
      }
      else {
        works.push(Object.assign({}, entry, {date: work.data.from}));
      }
    });
  }

  let speakings: any[] = [];
  if (data.speaking.nodes.length) {
    speakings = data.speaking.nodes.map((t: any) => ({
      table: t.table,
      title: t.data.title,
      date: t.data.date,
      slug: t.data.slug,
    }));
  }

  let writings = [];
  if (data.writing.nodes.length) {
    writings = data.writing.nodes.map((w: any) => ({
      table: w.table,
      title: w.data.title,
      slug: w.data.slug,
      date: w.data.date,
    }));
  }

  let photos = [];
  if (data.photography.nodes.length) {
    photos = data.photography.nodes.map((p: any) => ({
      table: p.table,
      date: p.data.date,
      link: p.data.link,
      slug: p.data.slug,
      attachment: p.data.attachments.localFiles.flatMap((a: any) => a.childImageSharp ? a.childImageSharp.gatsbyImageData : [])[0]
    }));
  }

  const items = [...works, ...writings, ...photos, ...speakings];

  const years = [
    ...new Set( // remove duplicate items
      items
        .map((i: any) => new Date(i.date).getFullYear())
        .sort((a, b) => b - a) // sort the dates in descending order.
    ),
  ];

  const structuredItemsToRender: Entry[] = [];

  interface Entry {
    date: any;
    entries: any[];
  }

  years.map((year: any) => {
    const entry: Entry = {
      date: year,
      entries: [],
    };
    items.map((i: any) => {
      if (new Date(i.date).getFullYear() == year) {
        entry.entries.push(i);
      }
    });
    structuredItemsToRender.push(entry);
  });

  const title = deHyphenate(location.pathname.split("/")[1]);
  const tagImageSrc = tagImage ? tagImage.src : null;

  return (
    <IndexLayout pageTitle={title} image={tagImageSrc}>
      <StyledTag>
        <div className="row">
          <section>
            <h1>{title}</h1>
            <div className="container--small">
              <div className="banner">
                {tagImage ? <GatsbyImage image={tagImage} className="img" alt={title} /> : null}
                {about ? <p className="about">{about}</p> : null}
              </div>
              {structuredItemsToRender.map((i: any) => (
                <section>
                  <h2>{i.date}</h2>
                  <div className="link-set">
                    {i.entries.map((entry: any) => {
                      return entry.table === "work" ? (
                        <div className="link-container">
                          <Link to={`/experience`}>
                            Work: {entry.title}
                          </Link>
                        </div>
                      ) : null;
                    })}
                    {i.entries.map((entry: any) => {
                      return entry.table === "Speaking" ? (
                        <div className="link-container">
                          <Link to={`/speaking/${entry.slug}`}>
                            Speaking: {entry.title}
                          </Link>
                        </div>
                      ) : null;
                    })}
                    {i.entries.map((entry: any) => {
                      return entry.table === "Writing" ? (
                        <div className="link-container">
                          <Link to={`/writing/${entry.slug}`}>
                            Writing: {entry.title}
                          </Link>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="images-container">
                    {i.entries.map((entry: any) => {
                      return entry.table === "Photography" ? (
                        <Link to={`/photography/${entry.slug}`}>
                          <div className="g-image">
                            <GatsbyImage image={entry.attachment} alt={entry.title} />
                          </div>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      </StyledTag>
    </IndexLayout>
  );
};

export default TagTemplate;
