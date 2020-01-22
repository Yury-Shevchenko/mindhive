const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeEmail } = require('../mail');

const Mutations = {

  async createSchool(parent, args, ctx, info){
    // TODO: Check login
    console.log('args', args);

    const school = await ctx.db.mutation.createSchool({
      data: {
        ...args
      }
    }, info);

    return school;
  },

  async createExperiment(parent, args, ctx, info){
    // Check login
    if(!ctx.request.userId){
      throw new Error('You must be logged in to do that!')
    };

    const experiment = await ctx.db.mutation.createExperiment({
      data: {
        // this is to create a relationship between the experiment and the author
        author: {
          connect: {
            id: ctx.request.userId
          }
        },
        ...args
      }
    }, info);
    return experiment;
  },
  // sign up a new user
  async signUp(parent, args, ctx, info){
    args.email = args.email.toLowerCase() // lower case email address
    // hash the password
    const password = await bcrypt.hash(args.password, 10)
    // create a user
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['IT'] },
      }
    }, info)
    // create the JWT token for user
    const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);
    // set the jwt as a cookie on response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // return user
    return user;
  },

  async login(parent, { email, password }, ctx, info) {
    // 1. Check if there is a user with that email
    const user = await ctx.db.query.user({
      where: { email }
    });
    if(!user){
      throw new Error(`No such user found for email ${email}`);
    };
    // 2. Check whether the password is correct
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
      throw new Error(`Invalid password!`);
    }
    // 3. Generate the JWT token
    const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // 5. Return the user
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'You are signed out!'}
  },

  async requestReset(parent, args, ctx, info) {
    // 1. Check if it is a real user
    const user = await ctx.db.query.user({
      where: { email : args.email }
    });
    if(!user) {
      throw new Error(`There is no user with the email address ${args.email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromise = promisify(randomBytes);
    const resetToken = (await randomBytesPromise(25)).toString('hex');
    const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: {
        email: args.email
      },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })
    // 3. Email the user the reset token
    const mailResponse = await transport.sendMail({
      from: 'mindhive@mindhive.com',
      to: user.email,
      subject: 'Your password reset token',
      html: makeEmail(`Your password reset token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset<a/>`)
    })

    return({message: "Thanks"})
  },

  async resetPassword(parent, args, ctx, info){
    // 1. Check if the passwords match
    if(args.password !== args.confirmPassword){
      throw new Error("Your passwords do not match!")
    };
    // 2. Check if the reset token is legit
    // 3. Check if it is expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now - 1000*60*60, // 1 hour
      }
    });
    if(!user){
      throw new Error("This token is either invalid or expired.")
    };
    // 4. Hash new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. Save new password, remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      }
    })
    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 7. Set the JWT cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // 8. Return the new user
    return updatedUser;
  }

};

module.exports = Mutations;
