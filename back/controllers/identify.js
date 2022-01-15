const mongoose = require("mongoose");

const identify = (user, agencyId) => {
  let ref;
  if (
    (user && user.role === "employer") ||
    (user && user.role === "particular")
  ) {
    ref = { poster: user && user._id, onModel: "user" };
  } else if (user && user.role === "business") {
    if (agencyId !== "null") {
      var hex = /[0-9A-Fa-f]{6}/g;
      let id = hex.test(agencyId)
        ? mongoose.Types.ObjectId(agencyId)
        : agencyId;

      ref = { poster: id, onModel: "agency" };
    }
  }
  // if (user && user.id_agency) {
  //   ref = { poster: user.id_agency, onModel: "agency" };
  // } else if (agency && agency._id) {
  //   ref = { poster: agency._id, onModel: "agency" };
  // } else if (agencyId !== "null") {
  //   var hex = /[0-9A-Fa-f]{6}/g;
  //   let id = hex.test(agencyId) ? mongoose.Types.ObjectId(agencyId) : agencyId;

  //   ref = { poster: id, onModel: "agency" };
  // } else if (user && user._id) {
  //   ref = { poster: user && user._id, onModel: "user" };
  // }
  return ref;
};
module.exports = identify;
