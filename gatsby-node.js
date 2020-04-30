/* eslint-disable no-param-reassign */
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  // https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/
  // https://github.com/gatsbyjs/gatsby/blob/master/examples/client-only-paths
  // Make the front page match everything client side.
  // Normally your paths should be a bit more judicious.
  // Configure client only router
  if (page.path === '/') {
    page.matchPath = '/*';
    createPage(page);
  }
};
