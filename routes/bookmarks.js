import express from "express";
import Bookmark from "../models/Bookmark.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// apply authMiddleware to all routes in this file----security//
router.use(authMiddleware);

// GET  /api/bookmarks -get all bookmarks for logged in user---this is like opening your personal bookmark folder//

router.get("/", async (req, res) => {
  try {
    // only find the bookmarks that belong to this user//
    // req.user._id comes from the authMiddleware//
    const bookmarks = await Bookmark.find({ user: req.user._id });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST  /api/bookmarks - create a new bookmark//
router.post("/", async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// PUT  /api/bookmarks/:id --update a bookmark//
router.put("/:id", async (req, res) => {
  try {
    const bookmarkToUpdate = await Bookmark.findById(req.params.id);

    if(!bookmarkToUpdate) {
      return res.status(404).json({ message: "No bookmark found with this id"});
    }
    // authorization check//
    if (bookmarkToUpdate.user.toString()!==req.user._id.toString()) {
      return res.status(403).json({ message: "User is not authorized to update this bookmark."});
    }
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bookmark);

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE  /api/bookmarks/:id -delete a bookmark//
router.delete("/:id", async (req, res) => {
  try {
    const bookmarkToDelete = await Bookmark.findById(req.params.id);

    if(!bookmarkToDelete) {
      return res.status(404).json({
        message: "no bookmark found with this id"
      });
    }
    // authorization check//
    if(bookmarkToDelete.user.toString()!==req.user._id.toString()) {
      return res.status(403).json({ message: "User is not authorized to delete this bookmark. "});
    }

    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark deleted" });
  } catch (error) {
    res.status(500).json(err);
    
  }
});

export default router;