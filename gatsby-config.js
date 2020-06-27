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
            tableName: `Work`,
          },
          {
            baseId,
            tableName: `Education`,
          },
          {
            baseId,
            tableName: `Volunteering`,
          },
          {
            baseId,
            tableName: `Photography`,
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
            queryName: `quotes`,
            tableLinks: [`person`, `tags`],
          },
        ],
      },
    },
  ],
};
