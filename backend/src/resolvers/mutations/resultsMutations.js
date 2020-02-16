const resultsMutations = {
  // add a new result of the experiment
  async addResult(parent, args, ctx, info) {
    // 1. Make sure that user is signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You are not signed in`);
    }
    // 2. Query the user current results
    const [existingResults] = await ctx.db.query.results({
      where: {
        user: { id: userId },
        experiment: { id: args.experimentId },
      },
    });
    console.log('data', args.data);
    // if there are existing results
    if (existingResults) {
      console.log('there are already results');
      return ctx.db.mutation.updateResult(
        {
          where: { id: existingResults.id },
          data: { quantity: existingResults.quantity + 1, data: args.data },
        },
        info
      );
    }
    // if there are no existing results
    return ctx.db.mutation.createResult(
      {
        data: {
          user: {
            connect: { id: userId },
          },
          experiment: {
            connect: { id: args.experimentId },
          },
          quantity: 1,
          data: args.data,
        },
      },
      info
    );
  },

  // delete result
  async deleteResult(parent, args, ctx, info) {
    const where = { id: args.id };
    // find result
    const result = await ctx.db.query.result({ where }, `{ id user {id} }`);
    // check whether user has permissions to delete the item or it is the result of this user
    const ownsResult = result.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN'].includes(permission)
    );
    if (!ownsResult && !hasPermissions) {
      throw new Error(`You don't have permission to do that!`);
    }
    // delete it
    return ctx.db.mutation.deleteResult({ where }, info);
  },
};

module.exports = resultsMutations;
