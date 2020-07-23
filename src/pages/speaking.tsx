import React from 'react';

import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import Talk, { TalkProps } from '../components/speaking/Talk';
import styled from '@emotion/styled';

const StyledSpeakingPage = styled.div`
  .speakings {
    padding: var(--gutter-large) 0;
  }
`;

export const SpeakingPageQuery = graphql`
  query {
    allAirtable(
      filter: { table: { eq: "Speaking" } }
      sort: { fields: [data___date], order: DESC }
    ) {
      nodes {
        data {
          title
          date
          notes {
            childMarkdownRemark {
              excerpt
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
  }
`;

const SpeakingPage = ({ data }: any) => {
  const speakings = data.allAirtable.nodes.map((t: any) => ({
    title: t.data.title,
    date: t.data.date,
    notes: t.data.notes ? t.data.notes.childMarkdownRemark.excerpt : null,
    link: t.data.link,
    slides: t.data.slides,
    organisation: (t.data.organisation
      ? t.data.organisation.map((o: any) => o.data.title)
      : [])[0],
    tags: t.data.tags ? t.data.tags.map((t: any) => t.data.name) : null,
  }));

  return (
    <IndexLayout>
      <StyledSpeakingPage>
        <div className="row">
          <section>
            <h1>Speaking</h1>
            <div className="speakings container--small">
              {speakings.map((talk: TalkProps, i: number) => (
                <Talk key={i + talk.title} {...talk} />
              ))}
            </div>
          </section>
        </div>
      </StyledSpeakingPage>
    </IndexLayout>
  );
};

export default SpeakingPage;
