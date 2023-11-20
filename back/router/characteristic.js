const express = require("express");

const characteristic = require("../models/Caracteristic")


const router = express.Router();


router.post("/addcharacteristic", characteristic);

module.exports = router;
