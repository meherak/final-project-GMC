const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    // name,email,password,phone
    // on suppose que dans cette etape que name + email+password mawjoudin
    // 1step check if the email exist or not in the DB

    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({ errors: [{ msg: "email is unique" }] });
    }
    // ****************************************************
    // if the amail didnt exist so we save the user

    const newUser = new User({ ...req.body });

    // before we save the user we should hasgh the password

    const saltRound = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRound);
    newUser.password = hashedPassword;

    // crerate the token

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      process.env.SECRET_KEY
    );

    // save the user
    await newUser.save();
    res.send({ msg: "reister success", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.send({ errors: [{ msg: "can not register the user" }] });
  }
};

exports.login = async (req, res) => {
  try {
    //   email+password
    const { email, password } = req.body;
    // check email exist wala la
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).send({ errors: [{ msg: "Bad Credantial" }] });
    }
    // check password eli baaththa nafsha eli f database
    //   findUser.password== password
    const testPasword = bcrypt.compareSync(password, findUser.password);
    if (!testPasword) {
      return res.status(400).send({ errors: [{ msg: "Bad Credantial" }] });
    }
    const token = jwt.sign(
      {
        _id: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // t3ada

    return res.status(200).send({ msg: "login succ", user: findUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Can not Login", error });
  }
};
