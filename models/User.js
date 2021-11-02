const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: Number,
  // role: {
  //   type: String,
  //   enum: ["agent", "chef", "admin"],

  // },
});

module.exports = User = model("user", UserSchema);
