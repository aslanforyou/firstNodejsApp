const express = require("express");
const router = express.Router();
const HomesCtrl = require('../controllers/homes');
const RoomsCtrl = require('../controllers/rooms');
const auth = require('../../libs/auth');


router.post('/', auth.bearerAuth, HomesCtrl.createHome);



module.exports = router;