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

  // PUT  /api/notes/:id  - update a note//
  router.put("/:id", async(req, res)=> {
    try {
      const noteToUpdate = await Note.findById(req.params.id);

      if(!noteToUpdate) {
        return res.status(404).json({ message: "No note found with this id!" });
      }

      if  (noteToUpdate.user.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "User is not authorized to update this note." });
      }

      // this needs an authorization check//
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(note);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // DELETE  /api/notes/:id - Delete a note//
  router.delete("/:id", async(req, res)=> {
    try {
      const noteToDelete = await Note.findById(req.params.id);

      if(!noteToDelete) {
        return res.status(404).json({
          message: "No note found with this id" 
        });
      }
      
      if (noteToDelete.user.toString() !== req.user._id.toString) {
        return res
        .status (403)
        .json({ message: "User is not authorized to delete this note." });
      }
      // this needs an authorization check//
      const note = await Note.findByIdAndDelete(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "No note found with this id!" });
      }
      res.json({ message: "Note deleted" });
    } catch (err) {
      res.status (500).json(err);
    }
  });

  export default router;
