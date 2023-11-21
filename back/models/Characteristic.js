const express = require("express");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const characteristicSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "postSchema",
  },
  _id: Schema.Types.ObjectId,
  space: Number,
  numberOfRooms: Number,
  adresse: String,
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

const postSchema = Schema({
  characteristic: { type: Schema.Types.ObjectId, ref: 'Characteristic' },
  title: String,
  price: Number,
  characteristic: [{ type: Schema.Types.ObjectId, ref: 'Characteristic' }]
});

const Characteristic = mongoose.model('Characteristic', characteristicSchema);
const Post = mongoose.model('Post', postSchema);

const router = express.Router();

router.post("/characteristic", async (req, res) => {
  // Your route logic here
  
  res.send('Characteristic post request received');
});

module.exports = {
  Characteristic,
  Post,
  router,
};
