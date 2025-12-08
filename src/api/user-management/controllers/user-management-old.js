module.exports = {
  async findAll(ctx) {
    try {
      const users = await strapi.query('plugin::users-permissions.user').findMany({
        populate: ['role'],
      });

      return users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        provider: user.provider,
        confirmed: user.confirmed,
        blocked: user.blocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        assignedField: user.assignedField,
        role: user.role ? {
          id: user.role.id,
          name: user.role.name,
          type: user.role.type,
        } : null,
      }));
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { id },
        populate: ['role'],
      });

      if (!user) {
        return ctx.notFound('User not found');
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        provider: user.provider,
        confirmed: user.confirmed,
        blocked: user.blocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        assignedField: user.assignedField,
        role: user.role ? {
          id: user.role.id,
          name: user.role.name,
          type: user.role.type,
        } : null,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    const { username, email, password, role, assignedField } = ctx.request.body;

    try {
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email },
      });

      if (existingUser) {
        return ctx.badRequest('Email already taken');
      }

      const user = await strapi.query('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          password,
          role,
          assignedField,
          provider: 'local',
          confirmed: true,
          blocked: false,
        },
        populate: ['role'],
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        provider: user.provider,
        confirmed: user.confirmed,
        blocked: user.blocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        assignedField: user.assignedField,
        role: user.role ? {
          id: user.role.id,
          name: user.role.name,
          type: user.role.type,
        } : null,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { username, email, password, role, assignedField } = ctx.request.body;

    try {
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (role) updateData.role = role;
      if (assignedField !== undefined) updateData.assignedField = assignedField;

      const user = await strapi.query('plugin::users-permissions.user').update({
        where: { id },
        data: updateData,
        populate: ['role'],
      });

      if (!user) {
        return ctx.notFound('User not found');
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        provider: user.provider,
        confirmed: user.confirmed,
        blocked: user.blocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        assignedField: user.assignedField,
        role: user.role ? {
          id: user.role.id,
          name: user.role.name,
          type: user.role.type,
        } : null,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    try {
      const user = await strapi.query('plugin::users-permissions.user').delete({
        where: { id },
      });

      if (!user) {
        return ctx.notFound('User not found');
      }

      return { message: 'User deleted successfully' };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getRoles(ctx) {
    try {
      const roles = await strapi.query('plugin::users-permissions.role').findMany();

      return {
        roles: roles.map(role => ({
          id: role.id,
          name: role.name,
          type: role.type,
          description: role.description,
        })),
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
