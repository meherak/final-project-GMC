const jwt = require("jsonwebtoken");
const identify = (agencyToken, userId) => {
  // test if the user is an agent
  if (agencyToken) {
    const decoded = jwt.verify(agencyToken, process.env.SECRET_KEY);
    return { id_user: userId, id_profile: decoded._id };
  } else {
    return { id_user: userId };
  }
};
module.exports = identify;
