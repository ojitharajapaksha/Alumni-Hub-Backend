module.exports = {
  async findAll(ctx) {
    try {
      const users = await strapi.query('plugin::users-permissions.user').findMany({
        populate: ['role'],
      });

      ctx.body = users.map(user => ({
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

      ctx.body = {
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
    const { username, email, password, role, assignedField, confirmed, blocked } = ctx.request.body;

    try {
      // Validate required fields
      if (!username || !email || !password) {
        return ctx.badRequest('Username, email, and password are required');
      }

      // Check if user already exists
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email },
      });

      if (existingUser) {
        return ctx.badRequest('Email already in use');
      }

      // Create user
      const newUser = await strapi.query('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          password,
          role: role || undefined,
          assignedField: assignedField || null,
          confirmed: confirmed !== undefined ? confirmed : true,
          blocked: blocked !== undefined ? blocked : false,
          provider: 'local',
        },
        populate: ['role'],
      });

      ctx.body = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        provider: newUser.provider,
        confirmed: newUser.confirmed,
        blocked: newUser.blocked,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        assignedField: newUser.assignedField,
        role: newUser.role ? {
          id: newUser.role.id,
          name: newUser.role.name,
          type: newUser.role.type,
        } : null,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { username, email, role, assignedField, confirmed, blocked } = ctx.request.body;

    try {
      // Check if user exists
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
        where: { id },
      });

      if (!existingUser) {
        return ctx.notFound('User not found');
      }

      // Update user
      const updatedUser = await strapi.query('plugin::users-permissions.user').update({
        where: { id },
        data: {
          username: username !== undefined ? username : existingUser.username,
          email: email !== undefined ? email : existingUser.email,
          role: role !== undefined ? role : existingUser.role,
          assignedField: assignedField !== undefined ? assignedField : existingUser.assignedField,
          confirmed: confirmed !== undefined ? confirmed : existingUser.confirmed,
          blocked: blocked !== undefined ? blocked : existingUser.blocked,
        },
        populate: ['role'],
      });

      ctx.body = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        provider: updatedUser.provider,
        confirmed: updatedUser.confirmed,
        blocked: updatedUser.blocked,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        assignedField: updatedUser.assignedField,
        role: updatedUser.role ? {
          id: updatedUser.role.id,
          name: updatedUser.role.name,
          type: updatedUser.role.type,
        } : null,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { id },
      });

      if (!user) {
        return ctx.notFound('User not found');
      }

      await strapi.query('plugin::users-permissions.user').delete({
        where: { id },
      });

      ctx.body = { message: 'User deleted successfully' };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getRoles(ctx) {
    try {
      const roles = await strapi.query('plugin::users-permissions.role').findMany();
      
      ctx.body = roles.map(role => ({
        id: role.id,
        name: role.name,
        description: role.description,
        type: role.type,
      }));
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
