const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.addNewProfile = async (req, res) => {
  // create a new Profile
  const newProfile = new Profile({ ...req.body, id_user: req.user._id });
  // before we save the user we should hasgh the password
  let { password } = req.body;
  try {
    const saltRound = await bcrypt.genSalt(+process.env.SALT);
    const hashedPassword = bcrypt.hashSync(password, saltRound);
    newProfile.password = hashedPassword;

    // save it in the database
    let profile = await newProfile.save();
    res.send({ msg: "profile is saved", profile });
  } catch (error) {
    res.status(403).send({ errors: [{ msg: "can not add profile", error }] });
    console.log(error);
  }
};
exports.myProfiles = async (req, res) => {
  try {
    const findProfiles = await Profile.find({ id_user: req.user._id });

    res.status(200).send({ msg: "your profiles are:", profile: findProfiles });
  } catch (error) {
    res
      .status(403)
      .send({ errors: [{ msg: "can not get your profiles", error }] });
  }
};
exports.allProfiles = async (req, res) => {
  try {
    const allProfiles = await Profile.find().populate("id_user");
    res.send({ msg: "all profiles", profile: allProfiles });
  } catch (error) {
    res.send({ error });
  }
};
exports.editProfile = async (req, res) => {
  let id = req.body.id;

  try {
    let profile = await Profile.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).send({ msg: `profile updated succ`, profile });
  } catch (error) {
    res.status(400).send({ msg: "we can not find or update", error });
  }
};
exports.deleteProfile = async (req, res) => {
  let id = req.params.id;
  try {
    let profile = await Profile.findByIdAndRemove(id);

    res.status(200).send({ msg: "removed profile", profile });
  } catch (error) {
    res.status(400).send({ msg: "we can not remove profile", error });
  }
};
exports.findProfile = async (req, res) => {
  let id = req.params.id;
  try {
    let profile = await Profile.findOne({ _id: id });

    res.status(200).send({ msg: "finded profile", profile });
  } catch (error) {
    res.status(400).send({ msg: "profile not found", error });
  }
};
exports.loginProfile = async (req, res) => {
  let { _id } = req.params;

  try {
    let checkProfile = await Profile.findById(_id);
    console.log(checkProfile);
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      checkProfile.password
    );
    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: "Bad Credantials" }] });
    }

    const agencyToken = jwt.sign({ _id }, process.env.SECRET_KEY);

    return res
      .status(200)
      .send({ agencyToken, profile: checkProfile, msg: "agency logged in" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "profile not found", error });
  }
};
