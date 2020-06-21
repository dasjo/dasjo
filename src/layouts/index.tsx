import React from "react";

import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import LayoutRoot from "../components/LayoutRoot";
import Nav from "../components/Nav";

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
        <>
          <Helmet>
            <html lang="en" />
            <title>{data.site.siteMetadata.title}</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <Nav />
          {children}
        </>
      </LayoutRoot>
    )}
  />
);

export default IndexLayout;
