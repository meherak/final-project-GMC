const User = require("../models/User");
const bcrypt = require("bcrypt");

const identify = require("./identify");
const mongoose = require("mongoose");

exports.addEmployer = async (req, res) => {
  let agencyId = req.headers["_id"];
  let user = req.user;

  const ref = identify(user, agencyId);
  const { password, name } = req.body;

  console.log(ref);

  try {
    const findUser = await User.findOne({ name });
    if (findUser) {
      return res.status(400).send({ errors: [{ msg: "name is unique" }] });
    }
  } catch (error) {
    return res.status(400).send({ errors: [{ msg: "Erreur inconnue" }] });
  }

  // ****************************************************
  // if the amail didnt exist so we save the user

  const newUser = new User({ ...req.body, id_agency: ref.poster });

  // before we save the user we should hasgh the password

  const saltRound = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  newUser.password = hashedPassword;

  try {
    // save the user
    const employer = await newUser.save();

    res.status(200).send({ msg: "employer added", employer });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "can not register the employer" }, error] });
    console.log(error);
  }
};

exports.myEmployers = async (req, res) => {
  let agencyId = req.headers["_id"];
  let user = req.user;

  const ref = identify(user, agencyId);

  let findEmployers;

  try {
    findEmployers = await User.aggregate([
      {
        $match: { id_agency: ref.poster },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "on_address",
          as: "addresses",
        },
      },
    ]);
    return res
      .status(200)
      .send({ msg: "your employers are:", employer: findEmployers });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send({ errors: [{ msg: "can not get your employers", error }] });
  }
};
