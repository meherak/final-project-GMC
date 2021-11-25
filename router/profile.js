const express = require("express");
const {
  addNewProfile,
  myProfiles,
  editProfile,
  deleteProfile,
  findProfile,
  allProfiles,
  loginProfile,
} = require("../controllers/profile.controller");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.post("/addprofile", isAuth, addNewProfile);
router.post("/loginprofile/:_id", isAuth, loginProfile);

// get my profiles
// @private route
// token
router.get("/myprofiles", isAuth, myProfiles);
//edit my profile
//@private roote
router.put("/editprofile", isAuth, editProfile);
//delite profile
//@private route
router.delete("/:id", isAuth, deleteProfile);

// route get all profiles
// @Public Route
// Method :GET
router.get("/findprofile/:id", isAuth, findProfile);
router.get("/allagency", allProfiles);

module.exports = router;
