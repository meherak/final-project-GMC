const express = require("express");
const {
  registerValidation,
  validation,
  //   loginValidation,
} = require("../middlewares/userValidation");
const isAuth = require("../middlewares/isAuth");
const {
  addEmployer,
  myEmployers,
} = require("../controllers/employer.controller");

const router = express.Router();

router.post(
  "/addemployer",
  isAuth,
  registerValidation(),
  validation,
  addEmployer
);
router.get("/myemployers", isAuth, myEmployers);

module.exports = router;
