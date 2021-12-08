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
    select: false,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["particular", "business"],
    required: true,
  },
});

module.exports = User = model("user", UserSchema);
