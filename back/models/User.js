const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const arrOfRole = ["particular", "business", "employer"];
const roleWithEmail = ["particular", "business"];
const isEmployer = () => {
  let role;
  if (roleWithEmail && roleWithEmail.indexOf(this.role) > -1) {
    return (role = { yes: false, no: true });
  }

  return (role = { yes: true, no: false });
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
    required: isEmployer.yes,
  },

  name: {
    type: String,
    required: true,
    // sparse: true,
  },

  email: {
    type: String,
    required: isEmployer.no,
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
