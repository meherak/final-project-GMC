const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not Authorized token" }] });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    // {
    // _id:""
    // }
    if (!decoded) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not Authorized decoded" }] });
    }
    const findUser = await User.findById(decoded._id);

    if (!findUser) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not Authorized finduser" }] });
    }
    req.user = findUser;
    next();
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
  }
};
module.exports = isAuth;
