const classMutations = {
  // create new class
  async createClass(parent, args, ctx, info) {
    console.log('args', args);
    // TODO: Check login
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    const schoolclass = await ctx.db.mutation.createClass(
      {
        data: {
          // this is to create a relationship between the class and the creator
          creator: {
            connect: {
              id: ctx.request.userId,
            },
          },
          ...args,
        },
      },
      info
    );

    return schoolclass;
  },

  // join class for students
  async joinClass(parent, args, ctx, info) {
    // Check login
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // connect user and the class
    const updatedProfile = await ctx.db.mutation.updateProfile(
      {
        data: {
          studentIn: {
            connect: {
              id: args.id,
            },
          },
        },
        where: {
          id: ctx.request.userId,
        },
      },
      `{ id username permissions }`
    );
    // console.log('updateProfile', updatedProfile);

    return { message: 'You joined the class!' };
  },

  // leave class for students
  async leaveClass(parent, args, ctx, info) {
    // Check login
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // disconnect user and the class
    const updatedProfile = await ctx.db.mutation.updateProfile(
      {
        data: {
          studentIn: {
            disconnect: {
              id: args.id,
            },
          },
        },
        where: {
          id: ctx.request.userId,
        },
      },
      `{ id username permissions }`
    );
    // console.log('updateProfile', updatedProfile);

    return { message: 'You left the class!' };
  },
};

module.exports = classMutations;
