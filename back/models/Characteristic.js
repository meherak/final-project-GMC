const express = require("express");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const characteristicSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "postSchema",
  },
  characteristic: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Characteristic",
  },
  space: Number,
  numberOfRooms: Number,
  address: String,
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

const postSchema = Schema({
  characteristic: { type: Schema.Types.ObjectId, ref: 'Characteristic' },
  title: String,
  price: Number
});

const Characteristic = mongoose.model('Characteristic', characteristicSchema);
const Post = mongoose.model('Post', postSchema);

const addCharacteristic = async (characteristicData) => {
  const newCharacteristic = new Characteristic(characteristicData);
  await newCharacteristic.save();
  return newCharacteristic._id;
};

const addPost = async (postData) => {
  const { characteristic, ...rest } = postData;
  const characteristicId = await addCharacteristic(characteristic);

  const newPost = new Post({
    ...rest,
    characteristic: characteristicId,
  });
  await newPost.save();
  return newPost;
};


module.exports = { Characteristic, Post,addCharacteristic,addPost };


