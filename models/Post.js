const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const postSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Post = model("post", postSchema);
