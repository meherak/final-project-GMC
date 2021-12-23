const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  // try {
  // name,email,password,phone
  // on suppose que dans cette etape que name + email+password mawjoudin
  // 1step check if the email exist or not in the DB

  const { email, password, name } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({ errors: [{ msg: "email is unique" }] });
    }
  } catch (error) {
    return res.status(400).send({ errors: [{ msg: "Erreur inconnue" }] });
  }

  // ****************************************************
  // if the amail didnt exist so we save the user

  const newUser = new User({ ...req.body });

  // before we save the user we should hasgh the password

  const saltRound = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  newUser.password = hashedPassword;
  // console.log(newUser);

  try {
    // save the user
    const { password, name, email, _id } = await newUser.save();

    // create the token
    const token = jwt.sign({ _id }, process.env.SECRET_KEY);
    res.status(200).send({ user: { name, email, _id }, token });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "can not register the user" }, error] });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password, name } = req.body;
  let checkUser;
  try {
    const usersProjection = {
      password: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    };
    // check email exist
    checkUser = await User.findOne(
      { $or: [{ email }, { name: email }] },
      usersProjection
    );
    if (!checkUser) {
      return res.status(400).send({ errors: [{ msg: "User Not found" }] });
    }
  } catch (error) {
    console.log(error);
  }

  // check password eli baaththa nafsha eli f database
  //   findUser.password== password

  // console.log(password, chechUser.password);
  const checkPassword = bcrypt.compareSync(password, checkUser.password);
  if (!checkPassword) {
    return res.status(400).send({ errors: [{ msg: "Bad Credantials" }] });
  }

  const token = jwt.sign(
    {
      _id: checkUser._id,
    },
    process.env.SECRET_KEY
  );

  return res.status(200).send({ token, user: checkUser });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(400).send({ msg: "Can not Login", error });
  // }
};
