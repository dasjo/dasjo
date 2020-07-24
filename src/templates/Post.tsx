import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import Tag from '../components/Tag';

import styled from '@emotion/styled';
import { breakpoints } from '../styles/variables';

const StyledPostTemplate = styled.article`
  padding: var(--gutter-huge) 0;

  h1 {
    font-size: var(--font-size-medium-2);

    @media (max-width: ${breakpoints.medium0}) {
      font-size: var(--font-size-medium-1);
    }
  }

  h2 {
    font-size: var(--font-size-medium);

    @media (max-width: ${breakpoints.medium0}) {
      font-size: 3.2rem;
    }
  }

  h3 {
    margin: var(--gutter-small-3) 0 var(--gutter-small-3);
  }
  h2 {
    margin: var(--gutter-large) 0 var(--gutter-small);

    &::after {
      margin-bottom: var(--gutter-small-1);
    }
  }

  h3 {
    margin-top: var(--gutter-small);
  }

  p + p {
    margin-top: var(--gutter-small);
  }

  ul {
    margin: var(--gutter-small-1) 0;
    font-size: var(--font-size-small);
  }

  li {
    &:not(:last-child) {
      margin-bottom: var(--gutter-small-3);
    }
  }

  & > * {
    &:not(:last-child) {
      margin-bottom: var(--gutter-small-2);
    }
  }

  .links {
    margin-top: var(--gutter-medium);

    br {
      display: block;
      margin: var(--gutter-small-3) 0;
    }
  }
`;

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
  const { title, date, text_en, link } = writing.data;
  const organisation = (writing.data.organisation
    ? writing.data.organisation.map((o: any) => o.data.title)
    : [])[0];

  const tags = writing.data.tags
    ? writing.data.tags.map((t: any) => t.data.name)
    : null;

  console.log(organisation, tags);
  return (
    <IndexLayout>
      <div className="row">
        <StyledPostTemplate className="container--small">
          <h1>{title}</h1>
          <p>
            {new Date(date).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="name-tags">
            <div className="org">{organisation}</div>
            <div>
              {tags.map((tag: string, i: number) => (
                <Tag text={tag} key={i + tag} />
              ))}
            </div>
          </div>
          {text_en ? (
            <div
              dangerouslySetInnerHTML={{
                __html: text_en.childMarkdownRemark.html,
              }}
            />
          ) : null}
          <div className="links">
            <a href={link} className="btn--text" target="_blank">
              Link to Source <span>&nbsp;&rarr;</span>
            </a>
            <br />
            <Link to="/writing/" className="btn--text">
              Back to Writings <span>&nbsp;&rarr;</span>
            </Link>
          </div>
        </StyledPostTemplate>
      </div>
    </IndexLayout>
  );
};

export default PostTemplate;
