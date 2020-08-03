import React from 'react';
import IndexLayout from '../layouts';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import styled from '@emotion/styled';
import CompanyAndTags from '../components/CompanyAndTags';

const StyledPostTemplate = styled.article`
  padding: var(--gutter-large-1) 0;
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

    return (
        <IndexLayout>
            <div className="row">
                <StyledPostTemplate className="container--small template">
                    <h1>{title}</h1>
                    <p>
                        {new Date(date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <CompanyAndTags
                        organisation={organisation}
                        tags={tags}
                    />
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
