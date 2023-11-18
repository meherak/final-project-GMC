const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yqucx.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    );
    console.log("you are connected to DB");
  } catch (error) {
    console.log("database is not connected", error);
  }
};

module.exports = connectDB;