// ***
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
// *************************
const app = express();
// **************************************
connectDB();

// *********************************
app.use(express.json());
app.use("/api/user", require("./router/user"));
app.use("/api/post", require("./router/post"));
app.use("/api/agency", require("./router/agency"));
app.use("/api/address", require("./router/address"));
app.use("/api/employer", require("./router/employer"));
app.use("/api/characteristic", require("./router/characteristic")); // jebna l characteristic router mel path te3ou w 3addineh lel use middlware  

// ************************************
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`you are listenning on PORT ${PORT}`)
);
