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
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Education`,
            tableLinks: [`organisation`],
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Volunteering`,
            tableLinks: [`organisation`],
            mapping: { notes: 'text/markdown' },
          },
          {
            baseId,
            tableName: `Photography`,
            tableLinks: [`tags`],
            mapping: { attachments: `fileNode` },
          },
          {
            baseId,
            tableName: `Tags`,
            tableLinks: [`organisation`],
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
            mapping: { text_en: 'text/markdown' },
            tableLinks: [`organisation`, `tags`],
          },
        ],
      },
    },
  ],
};
