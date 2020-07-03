const baseId = 'appp5IceUTSkfnLXO';

module.exports = {
  siteMetadata: {
    title: `Josef Dabernig`,
  },
  plugins: [
    `gatsby-plugin-ts`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyVMTnds6Vdgi9H2`,
        tables: [
          {
            baseId,
            tableName: `Writing`,
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
        ],
      },
    },
  ],
};
