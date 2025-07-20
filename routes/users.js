import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

const router = express.Router();

// POST   /api/users/register - create a new user//
router.post("/register", async (req, res)=> {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user});
  } catch (err) {
    res.status(400).json(err);
  }
  });
