import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

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
            return a.childImageSharp.fluid.src;
          })[0] : null;  
        }
        if (!image) {
          image = data.file.childImageSharp.fluid.src;
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
          />
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
        fluid(maxWidth: 500, maxHeight: 500) {
          sizes
          src
          srcSet
          aspectRatio
        }
      }
    }
  }
`