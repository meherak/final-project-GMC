const express = require("express");
const { Register, login } = require("../controllers/user.controllers");
const {
  registerValidation,
  validation,
  loginValidation,
} = require("../middlewares/userValidation");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/register",Register);
router.post(
  "/employer/register",
  isAuth,
  registerValidation(),
  validation,
  Register
);

router.post("/login", loginValidation(), validation, login);

router.get("/me", isAuth, (req, res) => {

  res.send({ user: req.user });
});

module.exports = router;
