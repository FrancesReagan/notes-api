import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";
import bookmarksRouter from "./routes/bookmarks.js";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middle ware//
app.use(cors({origin:"http://localhost:5173"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes//
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter); 
app.use("/api/bookmarks", bookmarksRouter);



 
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost: ${PORT}`));
