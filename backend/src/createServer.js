// Yoga is an Express server that uses Apollo Server
// https://github.com/prisma-labs/graphql-yoga

const { GraphQLServer } = require('graphql-yoga');

// where the data come from
const Query = require('./resolvers/Query');
// what happens with the data
const Mutation = require('./resolvers/Mutation');
// Prisma database
const db = require('./db');

// create graphql yoga server
function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;
