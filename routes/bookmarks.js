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

// POST  /api/bookmarks - create a new bookmark---saving a new bookmark//
router.post("/", async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      // bookmark data (title, url, etc)
      ...req.body,
    // auto assign to loggen in user//
      user: req.user._id,
    });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// PUT  /api/bookmarks/:id --update a bookmark----editing an existing boookmark//
router.put("/:id", async (req, res) => {
  try {
    // first find the bookmark the user wants to update//
    const bookmarkToUpdate = await Bookmark.findById(req.params.id);

    // if the book mark does not exist--then return the error message//
    if(!bookmarkToUpdate) {
      return res.status(404).json({ message: "No bookmark found with this id"});
    }
    // authorization check---ensure the user in question actually owns this bookmark----if they don't pass authorization check--then return error message//
    if (bookmarkToUpdate.user.toString()!==req.user._id.toString()) {
      return res.status(403).json({ message: "User is not authorized to update this bookmark."});
    }
    // user is authenicated --then go ahead and update the bookmark//
    const bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      // return the updated bookmark//
      { new: true }
    );
    res.json(bookmark);

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE  /api/bookmarks/:id -delete a bookmark//
router.delete("/:id", async (req, res) => {
  try {
    // find the bookmark that user wants to delete//
    const bookmarkToDelete = await Bookmark.findById(req.params.id);

    // if bookmark does not exist --return the error message//
    if(!bookmarkToDelete) {
      return res.status(404).json({
        message: "no bookmark found with this id"
      });
    }
    // authorization check-----security check---ensure user actually owns the bookmark in question that they want to delete//
    if(bookmarkToDelete.user.toString()!==req.user._id.toString()) {
      return res.status(403).json({ message: "User is not authorized to delete this bookmark. "});
    }

    // delete the bookmark//
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark deleted" });
  } catch (error) {
    res.status(500).json(err);
    
  }
});

export default router;