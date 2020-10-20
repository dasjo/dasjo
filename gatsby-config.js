require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path');
const baseId = process.env.AIRTABLE_BASEID;


module.exports = {
  siteMetadata: {
    title: 'Josef Kruckenberg',
    description: "Personal home of Josef Kruckenberg",
    siteUrl: "https://www.dasjo.at/",
  },
  plugins: [
    `gatsby-plugin-ts`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [{
          serialize(value) {
            const rssMetadata = value.query.site.siteMetadata;
            return value.query.allAirtable.nodes.map(node => {
              var rss = {};
              var img = node.data.attachments && node.data.attachments.localFiles ? node.data.attachments.localFiles.map((a) => {
                return a.childImageSharp.fluid.src;
              })[0] : null;
              var body = node.data.text_en.childMarkdownRemark.html + "<img src=\"" + rssMetadata.siteUrl + img + "\" />";
              rss['title'] = node.data.title;
              rss['description'] = body;
              rss['date'] = node.data.date;
              rss['url'] = rssMetadata.siteUrl + "/writing/" + node.data.slug;
              rss['guid'] = rssMetadata.siteUrl + "/writing/" + node.data.slug;
              rss['custom_elements'] = [{ "content:encoded": body }];
              return rss;
            })
          },
          query: `
          {       
            allAirtable(
              filter: {
                table: { eq: "Writing" }
                data: { tags: { elemMatch: { data: { name: { eq: "Drupal Planet" } } } } }
              }
              sort: { fields: [data___date], order: DESC }
            ) {
              nodes {
                table
                data {
                  title
                  slug
                  date
                  text_en {
                    childMarkdownRemark {
                      html
                    }
                  }
                  attachments {
                    localFiles {
                      childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 300) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
         `,
            output: "/drupal-planet.xml",
            title: "dasjo.at drupal planet",
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: path.join(__dirname, `src`, `resources`),
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_APIKEY,
        tables: [
          {
            baseId,
            tableName: `Organisation`,
          },
          {
            baseId,
            tableName: `Work`,
            tableLinks: [`roles`, `tags`, `location`, `organisation`],
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Education`,
            tableLinks: [`organisation`, `tags`],
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Volunteering`,
            tableLinks: [`organisation`, `tags`],
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Photography`,
            tableLinks: [`tags`, `organisation`],
            mapping: { attachments: `fileNode` },
          },
          {
            baseId,
            tableName: `Tags`,
            tableLinks: [`organisation`],
            mapping: { image: `fileNode` },
          },
          {
            baseId,
            tableName: `Person`,
          },
          {
            baseId,
            tableName: `Quotes`,
            tableLinks: [`person`, `tags`, `organisation`],
          },
          {
            baseId,
            tableName: `Roles`,
          },
          {
            baseId,
            tableName: `Location`,
          },
          {
            baseId,
            tableName: `Speaking`,
            tableLinks: [`organisation`, `tags`],
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Writing`,
            mapping: { text_en: 'text/markdown', attachments: `fileNode` },
            tableLinks: [`organisation`, `tags`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-18972553-1",
      },
    },
  ],
};
