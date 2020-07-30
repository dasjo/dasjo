import React, { useEffect } from 'react';

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

const IndexLayout = ({ children }: IndexLayoutProps) => {
  const handleMouseDownOnce = (): void => {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  };

  const handleFirstTab = (e: KeyboardEvent): void => {
    if (e.code === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab);

    return (): void => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
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
              <link rel="stylesheet" href="/font.css" />
            </Helmet>
            <Nav />
            <LayoutMain>{children}</LayoutMain>
            <Footer />
          </div>
        </LayoutRoot>
      )}
    />
  );
};

export default IndexLayout;
