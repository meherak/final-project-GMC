const express = require("express");
const {
  addAddress,
  editAddress,
} = require("../controllers/address.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/addaddress", isAuth, addAddress);
router.put("/editaddress", isAuth, editAddress);

module.exports = router;
