const express = require('express');
const { list } = require('../controllers/characteristic.controller');
const router = express.Router();

router.get('/all', list); // the list route with the method 'list' from the controller
// router.post('/seed',()=>{})

module.exports = router;
