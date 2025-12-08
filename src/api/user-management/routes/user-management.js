module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-management/all',
      handler: 'user-management.findAll',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/user-management/roles',
      handler: 'user-management.getRoles',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/user-management/:id',
      handler: 'user-management.findOne',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/user-management/create',
      handler: 'user-management.create',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/user-management/update/:id',
      handler: 'user-management.update',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/user-management/delete/:id',
      handler: 'user-management.delete',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
