/**
 * Bypass authentication middleware for specific routes
 */
module.exports = () => {
  return async (ctx, next) => {
    // List of routes that should bypass authentication
    const publicRoutes = [
      '/api/user-management/all',
      '/api/user-management/',
      '/api/user-management/create',
      '/api/user-management/update',
      '/api/user-management/delete',
      '/api/user-management/roles',
    ];

    // Check if the current route should bypass auth
    const shouldBypass = publicRoutes.some(route => ctx.request.url.startsWith(route));

    if (shouldBypass) {
      // Skip authentication by marking the request as authenticated
      ctx.state.isAuthenticated = true;
      ctx.state.user = { id: null }; // Dummy user to pass auth checks
    }

    await next();
  };
};
