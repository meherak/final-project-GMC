// ***
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
// *************************
const app = express();
// **************************************
// connect with the database
connectDB();

// *********************************
// router
app.use(express.json());
app.use("/api/user", require("./router/user"));
app.use("/api/post", require("./router/post"));
app.use("/api/agency", require("./router/agency"));
app.use("/api/address", require("./router/address"));
app.use("/api/employer", require("./router/employer"));

// ************************************
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`you are listenning on PORT ${PORT}`)
);
