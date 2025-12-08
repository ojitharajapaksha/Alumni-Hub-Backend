const customUserController = require('./controllers/custom-user');

module.exports = {
  register({ strapi }) {
    // Extend the users-permissions/user content type
    strapi.contentType('plugin::users-permissions.user').attributes = {
      ...strapi.contentType('plugin::users-permissions.user').attributes,
      assignedField: {
        type: 'enumeration',
        enum: [
          'Computer Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Chemical Engineering',
          'Biomedical Engineering',
          'Industrial Engineering',
          'Environmental Engineering',
          'Aerospace Engineering',
          'Software Engineering',
          'Data Science',
          'Artificial Intelligence'
        ],
      },
    };

    // Register custom controller
    strapi.controller('plugin::users-permissions.custom-user', customUserController);
  },

  routes: {
    'content-api': {
      type: 'content-api',
      routes: [
        {
          method: 'GET',
          path: '/user-management/all',
          handler: 'custom-user.find',
          config: {
            auth: false,
            prefix: '',
          },
        },
        {
          method: 'GET',
          path: '/user-management/:id',
          handler: 'custom-user.findOne',
          config: {
            auth: false,
            prefix: '',
          },
        },
        {
          method: 'POST',
          path: '/user-management/create',
          handler: 'custom-user.create',
          config: {
            auth: false,
            prefix: '',
          },
        },
        {
          method: 'PUT',
          path: '/user-management/update/:id',
          handler: 'custom-user.update',
          config: {
            auth: false,
            prefix: '',
          },
        },
        {
          method: 'DELETE',
          path: '/user-management/delete/:id',
          handler: 'custom-user.delete',
          config: {
            auth: false,
            prefix: '',
          },
        },
        {
          method: 'GET',
          path: '/user-management/roles',
          handler: 'custom-user.getRoles',
          config: {
            auth: false,
            prefix: '',
          },
        },
      ],
    },
  },

  async bootstrap({ strapi }) {
    // Grant public access to custom user routes
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
        where: { role: publicRole.id },
      });

      // Check if our custom permissions exist, if not we need to handle via policies
      console.log('✅ Public role found:', publicRole.id);
      console.log('✅ Existing permissions:', permissions.length);
    }

    console.log('✅ User model extended with assignedField');
    console.log('✅ Custom user routes registered');
  },
};

