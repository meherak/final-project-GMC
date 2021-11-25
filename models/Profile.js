const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const profileSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  agency_name: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  // agency_description: {
  //   type: String,
  //   required: true,
  // },
  // agency_address: [
  //   {
  //     country: { type: String, required: true },
  //   },
  //   {
  //     state: { type: String, required: true },
  //   },
  //   {
  //     city: { type: String, required: true },
  //   },
  //   {
  //     postal_code: { type: String, required: true },
  //   },
  //   {
  //     street: { type: String, required: true },
  //   },
  // ],
  // agency_MF: {
  //   type: String,
  //   required: true,
  // },
  // agency_code: {
  //   type: String,
  //   required: true,
  // },
});
module.exports = Profile = model("profile", profileSchema);
