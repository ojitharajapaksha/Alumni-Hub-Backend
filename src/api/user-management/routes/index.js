module.exports = [
  {
    method: 'GET',
    path: '/user-management/all',
    handler: 'controller.findAll',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/user-management/roles',
    handler: 'controller.getRoles',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/user-management/:id',
    handler: 'controller.findOne',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/user-management/create',
    handler: 'controller.create',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/user-management/update/:id',
    handler: 'controller.update',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'DELETE',
    path: '/user-management/delete/:id',
    handler: 'controller.delete',
    config: {
      auth: false,
      policies: [],
    },
  },
];
