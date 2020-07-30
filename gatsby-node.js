const hyphenate = (str) => str.split(' ').join('-').toLowerCase();
const { paginate } = require('gatsby-awesome-pagination') 

exports.createPages = async ({ graphql, reporter, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      writings: allAirtable(
        filter: { table: { eq: "Writing" } }
        sort: { fields: [data___date], order: DESC }
      ) {
        nodes {
          data {
            slug
          }
        }
      }

      tags: allAirtable(filter: { table: { eq: "Tags" } }) {
        nodes {
          data {
            name
          }
        }
      }

      albums: allAirtable(filter: {table: {eq: "Photography"}}) {
        nodes {
            data {
                slug
            }
        }
      }

      speakings: allAirtable(filter: {table: {eq: "Speaking"}}) {
        nodes {
            data {
                slug
            }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('Failed to create pages.', result.errors);
  }

  const writings = result.data.writings.nodes;
  const tags = result.data.tags.nodes;
  const albums = result.data.albums.nodes;
  const speakings = result.data.speakings.nodes;

  paginate({
      createPage,
      items: writings,
      itemsPerPage: 10,
      pathPrefix: '/writing',
      component: require.resolve('./src/templates/Writing.tsx'),
  })

  writings.forEach((writing) => {
    createPage({
      path: `/writing/${writing.data.slug}`,
      component: require.resolve('./src/templates/Post.tsx'),
      context: {
        slug: writing.data.slug,
      },
    });
  });

  tags.forEach((tag) => {
    createPage({
      path: `/${hyphenate(tag.data.name)}`,
      component: require.resolve('./src/templates/Tag.tsx'),
      context: {
        name: tag.data.name,
      },
    });
  });

  albums.forEach((album) => {
    createPage({
      path: `/photography/${album.data.slug}`,
      component: require.resolve('./src/templates/Album.tsx'),
      context: {
        slug: album.data.slug,
      },
    });
  });  

  speakings.forEach((speaking) => {
    createPage({
      path: `/speaking/${speaking.data.slug}`,
      component: require.resolve('./src/templates/Talk.tsx'),
      context: {
        slug: speaking.data.slug,
      },
    });
  });
};
