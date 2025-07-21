import express from "express";
import Note from "../models/Notes.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// apply authMiddleware to all routes in this file---all will be protected//
router.use(authMiddleware);

// GET  /api/notes - get all notes for the logged-in user//
// Fix this route--this is the route that currently has the flaw//
router.get("/", async (req, res,) => {
  // finds all notes in the database.//
  // but should only find notes owned by the logged in user //
  try {
    // as need it to be user: req.user._id as the auth middleware sets req.user = data where the data has _id not just id
    // as it was  req.user.id would return all notes or cause errors//
    const notes = await Note.find({ user: req.user._id })
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
        // TASK 1 part b and Task 2 the bug was req.user.id--changed to _id//
        user: req.user._id,
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
// TASK 2--updated note with ownership check and returns 403 unauthorized access//
      if  (noteToUpdate.user.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "User is not authorized to update this note." });
      }

      // authorization check//
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
      // original code given was missing () after toString//
      if (noteToDelete.user.toString() !== req.user._id.toString()) {
        return res
        .status (403)
        .json({ message: "User is not authorized to delete this note." });
      }
      //  authorization check//
      const note = await Note.findByIdAndDelete(req.params.id);
      // if (!note) {
      //   return res.status(404).json({ message: "No note found with this id!" });
      // }
      res.json({ message: "Note deleted" });
    } catch (err) {
      res.status (500).json(err);
    }
  });

  export default router;

  // the original code had issues that would have broken the security features----as req.user._id is the 
  // correct and the missing () in the POST and Delete route--//