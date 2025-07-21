import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";
import bookmarksRouter from "./routes/bookmarks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter); 
app.use("/api/bookmarks", bookmarksRouter);

db.once("open", () => {
  // original code was missing () and added arrow function--removed extra $ and changed POST to PORT/
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost: ${PORT}`));
});