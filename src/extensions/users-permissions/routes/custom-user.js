/**
 * Custom user management routes
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/users/all',
      handler: 'custom-user.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/users/:id',
      handler: 'custom-user.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/users/create',
      handler: 'custom-user.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/users/:id',
      handler: 'custom-user.update',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/users/:id',
      handler: 'custom-user.delete',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/users-permissions/roles',
      handler: 'custom-user.getRoles',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
