const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const addressSchema = new Schema({
  on_address: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "onModelAddress",
  },
  onModelAddress: {
    type: String,
    required: true,
    enum: ["agency", "post"],
  },

  state: { type: String, required: true },

  city: { type: String, required: true },

  postal_code: { type: String, required: true },

  street: { type: String, required: true },
});
module.exports = Address = model("address", addressSchema);
