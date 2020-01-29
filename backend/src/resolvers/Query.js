// this is place to interact with databases, external API, access the file system (e.g., csv file)
const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {

   // async schools(parent, args, ctx, info){
   //   const schools = await ctx.db.query.schools();
   //   return schools;
   // },
   schools: forwardTo('db'),
   experiments: forwardTo('db'),
   experiment: forwardTo('db'),

   me(parent, args, ctx, info){
     // check if there is a current user id
     if(!ctx.request.userId) {
       return null;
     }
     return ctx.db.query.user({
       where: { id: ctx.request.userId }
     }, info);
   },

   async users(parent, args, ctx, info){
     // check if the user has permission to see all users
     if(!ctx.request.userId) {
       throw new Error('You must be logged in');
     };
     hasPermission(ctx.request.user, ['IT']);
     // query all users
     return ctx.db.query.users({}, info);
   },

};

module.exports = Query;
