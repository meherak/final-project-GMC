const express = require("express");
const {
  addNewAgency,
  myAgencys,
  editAgency,
  deleteAgency,
  findAgency,
  allAgencys,
  loginAgency,
} = require("../controllers/agency.controller");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const agencyIsAuth = require("../middlewares/agencyIsAuth");

router.post("/addAgency", isAuth, addNewAgency);
router.post("/loginAgency", loginAgency);

// get my Agencys
// @private route
// token
router.get("/myAgencys", isAuth, myAgencys);
//edit my Agency
//@private roote
router.put("/editAgency", isAuth, editAgency);
//delite Agency
//@private route
router.delete("/:id", isAuth, deleteAgency);

// route get all Agencys
// @Public Route
// Method :GET
router.get("/findAgency/:id", isAuth, findAgency);
router.get("/allagency", allAgencys);
router.get("/me", isAuth, agencyIsAuth, (req, res) => {
  res.send({ agency: req.agency });
  // console.log(req.agency);
});

module.exports = router;
