exports.createPages = async ({ graphql, reporter, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allAirtable(
        filter: { table: { eq: "Writing" } }
        sort: { fields: [data___date], order: DESC }
      ) {
        nodes {
          data {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('Failed to create writings.', result.errors);
  }

  const writings = result.data.allAirtable.nodes;

  writings.forEach((writing) => {
    createPage({
      path: `/writing/${writing.data.slug}`,
      component: require.resolve('./src/templates/Post.tsx'),
      context: {
        slug: writing.data.slug,
      },
    });
  });
};
