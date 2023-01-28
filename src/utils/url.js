/**
 * Split url string into path segements
 *
 * @param {String} url For example: "dashboard/hero-association/tatsumaki"
 * @returns {Array} array of segements ['dashboard', 'hero-association', 'tatsumaki']
 */
export const splitUrlPaths = (url) => {
  return url.split('/').filter((seg) => {
    return seg.trim().length !== 0;
  });
};

/**
 * Get link based on route
 *
 * @param {Array} urlSegements path segements
 * @param {Object} route route item. See App#Routes
 * @returns {String} link as string
 */
const getBreadcrumbLink = (urlSegements, route) => {
  const segs = splitUrlPaths(route.path);
  return `/${urlSegements.slice(0, segs.length).join('/')}`;
};

/**
 * Create breadcrumb
 *
 * @param {Object} location history.location
 * @param {Array} routes list. @see routes.js
 * @returns {Array} array of breadcrumb items. For example: {route: Object, link: '/dashboard/hero-association'}
 */
export const createBreadcrumb = (location, routes) => {
  const urlSegements = splitUrlPaths(location.pathname);
  const breadCrumbs = urlSegements
    .map((seg) => {
      const route = routes[seg];
      return route != null ? { route, link: getBreadcrumbLink(urlSegements, route) } : null;
    })
    .filter((item) => {
      return item != null;
    });
  return breadCrumbs;
};
