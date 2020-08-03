import React from 'react';
import IndexLayout from '../layouts';
import SectionWork from '../components/experience/SectionWork';
import SectionEducation from '../components/experience/SectionEducation';
import SectionVolunteering from '../components/experience/SectionVolunteering';
import { graphql } from 'gatsby';
import { filterByFeatured } from '../utils/helpers';

export const experiencePageQuery = graphql`
  query {
    work: allAirtable(
      filter: { table: { eq: "Work" } }
      sort: { fields: [data___from], order: DESC }
    ) {
      nodes {
        data {
          title
          featured
          from
          to
          link
          notes {
            childMarkdownRemark {
              html
            }
          }
          roles {
            data {
              title
            }
          }
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
          tags {
            data {
                name
            }
          }
        }
      }
    }

    education: allAirtable(
      filter: { table: { eq: "Education" } }
      sort: { fields: [data___from], order: DESC }
    ) {
      nodes {
        data {
          title
          featured
          from
          to
          link
          notes {
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

    volunteering: allAirtable(
      filter: { table: { eq: "Volunteering" } }
      sort: { fields: [data___from], order: DESC }
    ) {
      nodes {
        data {
          title
          featured
          from
          link
          notes {
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
  }
`;

const ExperiencePage = ({ data }: any) => {
  const enteries = {
    work: filterByFeatured(
      data.work.nodes.map((t: any) => ({
        title: t.data.title,
        featured: !!t.data.featured,
        from: t.data.from,
        to: t.data.to,
        link: t.data.link,
        notes: t.data.notes ? t.data.notes.childMarkdownRemark.html : null,
        roles: t.data.roles ? t.data.roles.map((r: any) => r.data.title) : [],
        location: (t.data.location
          ? t.data.location.map((l: any) => l.data.title)
          : [])[0],
        organisation: (t.data.organisation
          ? t.data.organisation.map((o: any) => o.data.title)
          : [])[0],
        tags: t.data.tags ? t.data.tags.map((t: any) => t.data.name) : null,
      }))
    ),
    education: filterByFeatured(
      data.education.nodes.map((t: any) => {
        return {
          title: t.data.title,
          featured: !!t.data.featured,
          from: t.data.from,
          to: t.data.to,
          link: t.data.link,
          notes: t.data.notes ? t.data.notes.childMarkdownRemark.html : null,
          organisation: (t.data.organisation
            ? t.data.organisation.map((o: any) => o.data.title)
            : [])[0],
          tags: t.data.tags ? t.data.tags.map((t: any) => t.data.name) : null,
        };
      })
    ),
    volunteering: filterByFeatured(
      data.volunteering.nodes.map((t: any) => ({
        title: t.data.title,
        featured: !!t.data.featured,
        from: t.data.from,
        link: t.data.link,
        notes: t.data.notes ? t.data.notes.childMarkdownRemark.html : null,
        organisation: (t.data.organisation
          ? t.data.organisation.map((o: any) => o.data.title)
          : [])[0],
        tags: t.data.tags ? t.data.tags.map((t: any) => t.data.name) : null,
      }))
    ),
  };
  return (
    <IndexLayout>
      <div className="row">
        <section>
          <h1>Experience</h1>
          <div className="container--small">
            <SectionWork work={enteries.work} />
            <SectionEducation education={enteries.education} />
            <SectionVolunteering volunteering={enteries.volunteering} />
          </div>
        </section>
      </div>
    </IndexLayout>
  );
};

export default ExperiencePage;
