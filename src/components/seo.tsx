import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

interface Props {
  description?: string
  lang?: string
  meta?: any[]
  keywords?: string[]
  title?: string
  image?: string
  node?: any
}

export function SEO({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  image,
  node
}: Props) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {

        if(node && node.data && node.data.text_en && node.data.text_en.childMarkdownRemark) {
          description = node.data.text_en.childMarkdownRemark.excerpt || node.data.text_en.childMarkdownRemark.html;
        }

        const metaDescription = description || data.site.siteMetadata.description;

        if(!image && node) {
          image = node.data.attachments && node.data.attachments.localFiles ? node.data.attachments.localFiles.map((a: any) => {
            return getSrc(a.childImageSharp.gatsbyImageData);
          })[0] : null;  
        }
        if (!image) {
          image = getSrc(data.file.childImageSharp.gatsbyImageData);
        }

        image = data.site.siteMetadata.siteUrl + image;

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title || data.site.siteMetadata.title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: image,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `twitter:image`,
                content: image,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            {/* inline font stlye */}
            <style type="text/css">{`
              @font-face {
                font-family: 'Hk Grotesk';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url('/fonts/HKGrotesk-Regular.woff') format('woff');

              }
              /* space-mono-regular - latin */
@font-face {
  font-family: 'Space Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Space Mono'), local('SpaceMono-Regular'),
       url('../fonts/space-mono-v6-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('../fonts/space-mono-v6-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
            `}</style>
          </Helmet>
        )
      }}
    />
  )
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        image
        siteUrl
      }
    }
    file(relativePath: { eq: "josef.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          height: 500
        )
      }
    }
  }
`