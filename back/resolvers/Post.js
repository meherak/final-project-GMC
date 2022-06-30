const Agency = require("../models/Agency");
const User = require("../models/User");

async function poster(parent) {
  let agency = await Agency.findById(parent.poster);
  let user = await User.findById(parent.poster);
  return agency || user;
}

module.exports = { poster };
