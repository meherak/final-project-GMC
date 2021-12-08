const Address = require("../models/Address");
const identify = require("./identify");
exports.addAddress = async (req, res) => {
  try {
    newAddress = new Address({
      ...req.body,
      //   ...ref,
    });
    // save it in the database
    let address = await newAddress.save();
    res.send({ msg: "address is saved", address });
  } catch (error) {
    res.status(403).send({ errors: [{ msg: "can not add address", error }] });
  }
};
exports.editAddress = async (req, rep) => {
  try {
  } catch (error) {}
};
