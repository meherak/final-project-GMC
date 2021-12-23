const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const isNotEmployer = require("./isNotEmployer");
const arrOfRole = ["particular", "business", "employer"];
const roleWithEmail = ["particular", "business"];
const isNotEmployer = () => {
  if (roleWithEmail.indexOf(this.role) > -1) {
    return true;
  }
  return false;
};

const UserSchema = new Schema({
  role: {
    type: String,
    enum: arrOfRole,
    required: true,
  },
  id_agency: {
    type: mongoose.Types.ObjectId,
    ref: "agency",
    required: isNotEmployer(),
  },

  name: {
    type: String,
    required: true,
    // sparse: true,
  },

  email: {
    type: String,
    required: isNotEmployer,
    // sparse: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: Number,
    // sparse: true,
    // unique: true,
  },
});

module.exports = User = model("user", UserSchema);
