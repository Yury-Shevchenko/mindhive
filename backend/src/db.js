const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true,
});

module.exports = db;

// graphql-yoga connects here to the remote prisma DB and gives an ability to query it with JavaScript
// https://github.com/prisma-labs/prisma-binding
