const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Agency = require("../models/Agency");

const isAuth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ errors: [{ msg: "Not Authorized token" }] });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded) {
    return res
      .status(401)
      .send({ errors: [{ msg: "Not Authorized decoded token" }] });
  }
  try {
    const findUser = await User.findById(decoded._id);

    if (!findUser) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not Authorized find user" }] });
    }

    if (findUser) {
      req.user = findUser;
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ errors: [{ msg: "Not Authorizeddd" }, error] });
  }
};
module.exports = isAuth;
