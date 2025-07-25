import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import passport from "../config/passport.js";

const router = express.Router();

// POST   /api/users/register - create a new user//
router.post("/register", async (req, res)=> {
  try {

    // create new user with data from request body//
    // the User model will automatically hash the password//
    const user = await User.create(req.body);

    // give them an ID card(JWT token) immediately after signup//
    const token = signToken(user);

    // send back the token and user information//
    res.status(201).json({ token, user});

    // error happened --email may have already been made//
  } catch (err) {
    res.status(400).json(err);
  }
  });

  // Logging in to existing account//
  // POST  /api/users/login - authenticate a user and return a token//
  router.post("/login", async (req,res) => {
    // find the user with this email in the database//
    const user = await User.findOne({ email: req.body.email });

    // if no user is found--- it is the wrong email...//
    if(!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    // does password match?//
    const correctPw = await user.isCorrectPassword(req.body.password);

    // if wrong password -- return error//
    if(!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    // success means they receive a token//
    const token = signToken(user);
    res.json({ token, user });
  });

// Route to start the OAuth flow
// if a user visits this URL...they will be redirected to GitHub to log in.//
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }) 
);
 
// GitHub interacts with this route --the callback route that GitHub will redirect to after the user approves.//
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login', 
    session: false 
  }),
  (req, res) => {
    // Github login worked---req.user has the user information from GitHub//
    // give user token//
    const token = signToken(req.user);
    // send back the token and the user info//
    res.json({ token, user: req.user });
  }
);
  
  export default router;