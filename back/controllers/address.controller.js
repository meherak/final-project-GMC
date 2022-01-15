const Address = require("../models/Address");
exports.addAddress = async (req, res) => {
  try {
    newAddress = new Address({
      ...req.body,
    });
    // save it in the database
    let address = await newAddress.save();
    res.send({ msg: "address is saved", address });
  } catch (error) {
    res.status(403).send({ errors: [{ msg: "can not add address", error }] });
  }
};
exports.editAddress = async (req, res) => {
  let id = req.body._id;
  try {
    let address = await Address.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).send({ msg: `address updated succ`, address });
  } catch (error) {
    res.status(400).send({ msg: "we can not find or update", error });
  }
};
