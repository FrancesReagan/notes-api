import express from "express";
import Note from "../models/Notes";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// apply authMiddleware to all routes in this file//
router.use(authMiddleware);

// GET  /api/notes - get all notes for the logged-in user//
// Fix this route--this is the route that currently has the flaw//
router.get("/", async(req, res,) => {
  // this currently finds all notes in the database.//
  // it should only find notes owned by the logged in user //
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
  });

  // POST  /api/notes = create a new note//
  router.post("/", async(req, res)=> {
    try {
      const note = await Note.create({
        ...req.body,
        // the user ID needs to be added here//
        user: req.user.id,
      });
      res.status(201).json(note);
    } catch (err) {
      res.status(400).json(err);
    }
  });
