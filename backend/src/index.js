// here the server starts (entry point of the application)
// environment variables (to store the frontend url, prisma endpoint, prisma and app secret keys, and the port number)
require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser')
const createServer = require('./createServer')
const db = require('./db')

const server = createServer();

// use express middleware to use cookies (JWT)
server.express.use(cookieParser());

// use express middleware to populate current user
// decode JWT to get user id on each request
server.express.use( (req, res, next) => {
  // pull the token out of request
  const { token } = req.cookies;
  if(token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the user id on the request
    req.userId = userId;
  }
  next();
});

// create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  if(!req.userId) return next();
  const user = await db.query.profile({
    where: {id: req.userId}},
    '{ id username permissions }'
  );
  req.user = user;
  next();
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, deets => {
  console.log(`Server is running on port http://localhost:${deets.port}`)
})
