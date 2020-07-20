import React from 'react';

import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import { deHyphenate, filterByFeatured } from '../utils/helpers';
import Talk, { TalkProps } from '../components/speaking/Talk';
import Photos, { PhotosProps } from '../components/photography/Photos';
import PostBanner, { PostBannerProps } from '../components/writing/PostBanner';

export const query = graphql`
  query($name: String) {
    photography: allAirtable(
      filter: {
        table: { eq: "Photography" }
        data: { tags: { elemMatch: { data: { name: { eq: $name } } } } }
      }
    ) {
      nodes {
        data {
          title
          link
          date
          featured
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
    speaking: allAirtable(
      filter: {
        table: { eq: "Speaking" }
        data: { tags: { elemMatch: { data: { name: { eq: $name } } } } }
      }
      sort: { fields: [data___date], order: DESC }
    ) {
      nodes {
        data {
          title
          date
          notes {
            childMarkdownRemark {
              html
            }
          }
          link
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
    writing: allAirtable(
      filter: {
        table: { eq: "Writing" }
        data: { tags: { elemMatch: { data: { name: { eq: $name } } } } }
      }
      sort: { fields: [data___date], order: DESC }
    ) {
      nodes {
        data {
          title
          slug
          featured
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
        }
      }
    }
  }
`;

const TagTemplate = ({ location, data }: any) => {
  let speakings;
  if (data.speaking.nodes.length) {
    speakings = data.speaking.nodes.map((t: any) => ({
      title: t.data.title,
      date: t.data.date,
      notes: t.data.notes ? t.data.notes.childMarkdownRemark.html : null,
      link: t.data.link,
      slides: t.data.slides,
      organisation: (t.data.organisation
        ? t.data.organisation.map((o: any) => o.data.title)
        : [])[0],
      tags: t.data.tags ? t.data.tags.map((t: any) => t.data.name) : null,
    }));
  }

  let photos;

  if (data.photography.nodes.length) {
    photos = data.photography.nodes.map((p: any) => ({
      date: p.data.date,
      title: p.data.title,
      link: p.data.link,
      attachments: p.data.attachments.localFiles.map((a: any) => {
        return a.childImageSharp.fluid.src;
      }),
    }));
  }

  let writings;

  if (data.writing.nodes.length) {
    writings = filterByFeatured(
      data.writing.nodes.map((w: any) => ({
        title: w.data.title,
        slug: w.data.slug,
        featured: w.data.featured,
        date: w.data.date,
        excerpt: w.data.text_en
          ? w.data.text_en.childMarkdownRemark.excerpt
          : null,
        organisation: (w.data.organisation
          ? w.data.organisation.map((o: any) => o.data.title)
          : [])[0],
        tags: w.data.tags ? w.data.tags.map((t: any) => t.data.name) : null,
      }))
    );
  }

  console.log(writings, photos, speakings);

  return (
    <IndexLayout>
      <div className="row">
        <section>
          <h1>Tag: {deHyphenate(location.pathname.split('/')[2])}</h1>
          <div className="container--small">
            <section>
              {speakings ? <h2>Speaking</h2> : null}
              {speakings
                ? speakings.map((talk: TalkProps, i: number) => (
                    <Talk key={i + talk.title} {...talk} />
                  ))
                : null}
              {photos ? <h2>Photography</h2> : null}
              {photos
                ? photos.map((p: PhotosProps) => <Photos {...p} />)
                : null}
              {writings ? <h2>Writings</h2> : null}
              {writings
                ? writings.map((w: PostBannerProps, i) => (
                    <PostBanner key={i + w.title} {...w} />
                  ))
                : null}
            </section>
          </div>
        </section>
      </div>
    </IndexLayout>
  );
};

export default TagTemplate;
