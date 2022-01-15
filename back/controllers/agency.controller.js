const Agency = require("../models/Agency");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.addNewAgency = async (req, res) => {
  // create a new Agency
  let newAgency;
  if (req.user && req.user._id) {
    newAgency = new Agency({ ...req.body, id_user: req.user._id });
  }
  if (req.agency && req.agency.id_user) {
    newAgency = new Agency({ ...req.body, id_user: req.agency.id_user });
  }
  // before we save the agency we should hasgh the password
  let { password } = req.body;
  try {
    const saltRound = await bcrypt.genSalt(+process.env.SALT);
    const hashedPassword = bcrypt.hashSync(password, saltRound);
    newAgency.password = hashedPassword;

    // save it in the database
    let agency = await newAgency.save();
    res.send({ msg: "agency is saved", agency });
  } catch (error) {
    res.status(403).send({ errors: [{ msg: "can not add agency", error }] });
  }
};
exports.myAgencys = async (req, res) => {
  let findAgencys;
  if (req.user && req.user.role === "business") {
    try {
      findAgencys = await Agency.aggregate([
        { $match: { id_user: req.user._id } },
        {
          $lookup: {
            from: "addresses",
            localField: "_id",
            foreignField: "on_address",
            as: "addresses",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "id_agency",
            as: "employers",
          },
        },
      ]);
      return res
        .status(200)
        .send({ msg: "your agencys are:", agency: findAgencys });
    } catch (error) {
      res
        .status(403)
        .send({ errors: [{ msg: "can not get your agencys", error }] });
    }
  }
};
exports.allAgencys = async (req, res) => {
  try {
    const allAgencys = await Agency.find().populate("id_user");
    res.send({ msg: "all agencys", agency: allAgencys });
  } catch (error) {
    res.send({ error });
  }
};
exports.editAgency = async (req, res) => {
  let id = req.body.id;

  try {
    let agency = await Agency.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).send({ msg: `agency updated succ`, agency });
  } catch (error) {
    res.status(400).send({ msg: "we can not find or update", error });
  }
};
exports.deleteAgency = async (req, res) => {
  let id = req.params.id;
  try {
    let agency = await Agency.findByIdAndRemove(id);

    res.status(200).send({ msg: "removed agency", agency });
  } catch (error) {
    res.status(400).send({ msg: "we can not remove agency", error });
  }
};
exports.findAgency = async (req, res) => {
  let id = req.params.id;
  try {
    let agency = await Agency.findOne({ _id: id });

    res.status(200).send({ msg: "finded agency", agency });
  } catch (error) {
    res.status(400).send({ msg: "agency not found", error });
  }
};
exports.loginAgency = async (req, res) => {
  // let { _id } = req.params;
  const { email, password } = req.body;
  let checkAgency;
  try {
    const usersProjection = {
      password: true,
      agency_name: true,
      email: true,
      phone: true,
      _id: true,
    };
    checkAgency = await Agency.findOne({ email }, usersProjection);
    // console.log(checkAgency);
    if (!checkAgency) {
      return res.status(400).send({ errors: [{ msg: "Agency Not found" }] });
    }
    const checkPassword = bcrypt.compareSync(password, checkAgency.password);
    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: "Bad Credantials" }] });
    }

    const agencyToken = jwt.sign(
      { _id: checkAgency._id },
      process.env.SECRET_KEY
    );

    return res
      .status(200)
      .send({ agencyToken, agency: checkAgency, msg: "agency logged in" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "error to log in", error });
  }
};
