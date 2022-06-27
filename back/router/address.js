const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isAuth");
const {
  addAddress,
  editAddress,
} = require("../controllers/address.controller");

router.post("/addaddress", isAuth, addAddress);
router.put("/editaddress", isAuth, editAddress);

module.exports = router;
