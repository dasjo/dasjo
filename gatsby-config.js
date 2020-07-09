const path = require('path');
const baseId = 'appp5IceUTSkfnLXO';

module.exports = {
  siteMetadata: {
    title: `Josef Dabernig`,
  },
  plugins: [
    `gatsby-plugin-ts`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
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
        apiKey: `keyVMTnds6Vdgi9H2`,
        tables: [
          {
            baseId,
            tableName: `Writing`,
            mapping: { text_en: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Organisation`,
          },
          {
            baseId,
            tableName: `Work`,
            tableLinks: [`roles`, `tags`, `location`, `organisation`],
          },
          {
            baseId,
            tableName: `Education`,
            tableLinks: [`organisation`],
          },
          {
            baseId,
            tableName: `Volunteering`,
            tableLinks: [`organisation`],
          },
          {
            baseId,
            tableName: `Photography`,
            tableLinks: [`tags`],
          },
          {
            baseId,
            tableName: `Tags`,
          },
          {
            baseId,
            tableName: `Person`,
          },
          {
            baseId,
            tableName: `Quotes`,
            tableLinks: [`person`, `tags`],
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
            mapping: { text_en: 'text/markdown' },
            tableLinks: [`organisation`, `tags`],
          },
        ],
      },
    },
  ],
};
