import mongoose, { Schema } from "mongoose";  

const noteSchema = new Schema({
  title: {
  type: String,
  required: true,
  trim: true,
},
 content: {
 type: String,
 required: true,
},
createdAt: {
  type: Date,
  default: Date.now,
},
user: {
  // Task1--associate Notes with Users part A//
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
// notebook: 
});

const Note = mongoose.model("Note", noteSchema);
export default Note;