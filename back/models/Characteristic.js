const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const characteristicSchema = new Schema({
  name: { type: String }, // Picine circular,
  slug: { type: String, slug: "name" }, // picine-circular --> unique
});

const Characteristic = model("characteristic", characteristicSchema);
module.exports =  Characteristic ;

