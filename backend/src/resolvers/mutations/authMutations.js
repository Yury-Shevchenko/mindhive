const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeEmail } = require('../../mail');

const authMutations = {

  // sign up a new user with email authentication identity
  async emailSignUp(parent, args, ctx, info){
    console.log("starting sign up")
    args.email = args.email.toLowerCase() // lower case email address
    args.username = args.username.toLowerCase() // lower case username
    // hash the password
    const password = await bcrypt.hash(args.password, 10)

    // TODO: if the user does not have a profile, create a profile (which will have the email auth identity)
    // create a profile (which will have the email auth identity)
    const profile = await ctx.db.mutation.createProfile({
      data: {
        username: args.username,
        permissions: { set: ['IT'] },
      }
    }, `{ id }`)

    // create a email authentication identity
    const authEmail = await ctx.db.mutation.createAuthEmail({
      data: {
        email: args.email,
        password,
        profile: {
          connect: {
            id: profile.id
          }
        }
      }
    }, `{ id }`)
    console.log("created auth email identity")
    // connect the email auth identity to profile
    const updatedProfile = await ctx.db.mutation.updateProfile({
      data: { authEmail: {
        connect: {
          id: authEmail.id
        }
      } },
      where: {
        id: profile.id
      }
    }, `{ id username permissions }`)

    // create the JWT token for user
    const token = jwt.sign({ userId: updatedProfile.id }, process.env.APP_SECRET);
    // set the jwt as a cookie on response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // return user
    return updatedProfile;
  },

  async emailLogin(parent, { email, password }, ctx, info) {
    // 1. Check if there is a email auth identity with that email
    const authEmail = await ctx.db.query.authEmail({
      where: { email }
    }, `{ id password profile {id} }`);
    if(!authEmail){
      throw new Error(`No such user found for email ${email}`);
    };
    // 2. Check whether the password is correct
    const valid = await bcrypt.compare(password, authEmail.password);
    if(!valid){
      throw new Error(`Invalid password!`);
    }
    console.log('found auth email identity')
    // 3. Find the profile which has this auth identity
    const profile = await ctx.db.query.profile({
      where: {
        id: authEmail.profile.id
      }
    }, info)
    // 3. Generate the JWT token
    const token = jwt.sign({ userId: profile.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // 5. Return the user
    return profile;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'You are signed out!'}
  },

  async requestReset(parent, args, ctx, info) {
    // 1. Check if it is a real user
    const authEmail = await ctx.db.query.authEmail({
      where: { email : args.email }
    });
    if(!authEmail) {
      throw new Error(`There is no user with the email address ${args.email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromise = promisify(randomBytes);
    const resetToken = (await randomBytesPromise(25)).toString('hex');
    const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    const res = await ctx.db.mutation.updateAuthEmail({
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
      to: authEmail.email,
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
    const [authEmail] = await ctx.db.query.authEmails({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now - 1000*60*60, // 1 hour
      }
    });
    if(!authEmail){
      throw new Error("This token is either invalid or expired.")
    };
    // 4. Hash new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. Save new password, remove old reset token fields
    const updatedAuthEmail = await ctx.db.mutation.updateAuthEmail({
      where: {
        email: authEmail.email
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      }
    }, `{ id profile {id} }`)
    // 6. Find a profile
    const profile = await ctx.db.query.profile({
      where: {
        id: updatedAuthEmail.profile.id
      }
    }, info)

    // 7. Generate JWT
    const token = jwt.sign({ userId: profile.id }, process.env.APP_SECRET);
    // 8. Set the JWT cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // 8. Return the new user
    return profile;
  },

}

module.exports = authMutations;
