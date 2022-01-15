const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const agencySchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  agency_name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  agency_description: {
    type: String,
    required: true,
  },
});
module.exports = Agency = model("agency", agencySchema);
