import React from 'react';

import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import LayoutRoot from '../components/LayoutRoot';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import LayoutMain from '../components/LayoutMain';

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

interface IndexLayoutProps {
  children: JSX.Element;
}

const IndexLayout = ({ children }: IndexLayoutProps) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <div className="page-wrapper">
          <Helmet>
            <html lang="en" />
            <title>{data.site.siteMetadata.title}</title>
          </Helmet>
          <Nav />
          <LayoutMain>{children}</LayoutMain>
          <Footer />
        </div>
      </LayoutRoot>
    )}
  />
);

export default IndexLayout;
