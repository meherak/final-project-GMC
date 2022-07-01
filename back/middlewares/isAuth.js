const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req) => {
  const token = req.headers["authorization"];
  if (!token) {
    console.log("Missed token");

    return "Missed token";
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded) {
    console.log("Not valid token");

    return "Not valid token";
  }

  try {
    const user = await User.findById(decoded._id);

    if (!user) {
      console.log("User not found");
      return "User not found";
    }

    if (user) {
      return user;
    }
  } catch (error) {
    throw error;
  }
};
module.exports = isAuth;
