const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const postSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: ["agency", "user"],
  },

  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sType: {
    type: String,
    required: true,
    enum: ["by", "rent"],
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Post = model("post", postSchema);
