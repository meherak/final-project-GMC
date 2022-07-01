const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.singUp = async (parent, args, context, info) => {
  const { email, password } = args;

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      throw "email is unique";
    }
  } catch (error) {
    throw `error: ${error}`;
  }

  // if the amail didnt exist so we create new  user
  const newUser = new User({ ...args });

  // before we save the user we should hasgh the password
  const saltRound = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  newUser.password = hashedPassword;

  try {
    // save the user to the DataBase
    const user = await newUser.save();
    const { _id } = user;

    // create the token
    const token = jwt.sign({ _id }, process.env.SECRET_KEY);
    return { user, token };
  } catch (error) {
    throw `error: ${error}`;
  }
};
