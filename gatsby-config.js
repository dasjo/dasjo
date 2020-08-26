require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path');
const baseId = process.env.AIRTABLE_BASEID;


module.exports = {
  siteMetadata: {
    title: 'Josef Dabernig',
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
