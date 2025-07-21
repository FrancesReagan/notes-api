import  mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

url: {
  type: String,
  required: true,
  trim: true,
},

description: {
  type: String,
  trim: true,
},

tags: [{
  type: String,
  trim: true,

}],

createdAt: {
  type: Date,
  default: Date.now,
},

})