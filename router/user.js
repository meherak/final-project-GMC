const express = require("express");
const { Register, login } = require("../controllers/user.controllers");
const {
  registerValidation,
  validation,
  loginValidation,
} = require("../middlewares/userValidation");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Register==Signup ==Create account
router.post("/register", registerValidation(), validation, Register);

// Login==signin
router.post("/login", loginValidation(), validation, login);

router.get("/current", isAuth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
