const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const Agency = require("../models/Agency");

const agencyIsAuth = async (req, res, next) => {
  const _id = req.headers["_id"];
  let findAgency;
  // console.log(_id);
  if (_id !== "null") {
    try {
      findAgency = await Agency.findById(_id);

      if (!findAgency) {
        return res
          .status(401)
          .send({ errors: [{ msg: "Not Authorized find agency" }] });
      }
      if (
        req.user &&
        req.user._id &&
        findAgency &&
        findAgency.id_user &&
        String(findAgency.id_user) !== String(req.user._id)
      ) {
        return res
          .status(401)
          .send({ errors: [{ msg: "Not Authorized user mismatch" }] });
      }
      req.agency = findAgency;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not Authorizedd" }, error] });
    }
  } else if (req.agency) {
    next();
  }
  // else {
  //   try {
  //     findAgency = await Agency.findById(req.user._id);
  //     if (!findAgency) {
  //       return res
  //         .status(401)
  //         .send({ errors: [{ msg: "Not Authorized find agency" }] });
  //     }
  //   } catch (error) {
  //     return res
  //       .status(401)
  //       .send({ errors: [{ msg: "Not Authorized" }, error] });
  //   }
  // }
};
module.exports = agencyIsAuth;
