const express = require("express");
const router = express.Router();
const HomesCtrl = require('../controllers/homes');
const RoomsCtrl = require('../controllers/rooms');
const auth = require('../../libs/auth');
const userId = require('../../libs/userId');

router.get('/',  auth.bearerAuth, HomesCtrl.getHome);
router.post('/', auth.bearerAuth, HomesCtrl.createHome);
router.post('/delete', auth.bearerAuth, HomesCtrl.deleteHome);

router.post('/room',  RoomsCtrl.getRoom);
router.post('/newroom', auth.bearerAuth, RoomsCtrl.createRoom);





module.exports = router;