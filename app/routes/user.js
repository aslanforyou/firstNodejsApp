const express = require("express");
const router = express.Router();
const Users = require('../models/user');
const UserCtrl = require('../controllers/user');
const auth = require('../../libs/auth');

router.get('/', auth.bearerAuth, UserCtrl.getUser);
router.post('/login',UserCtrl.loginUser);
router.post('/', UserCtrl.createUser);
router.put('/saveuser', UserCtrl.saveUser);
router.put('/saveuserpsw', UserCtrl.saveUserpsw);
router.delete('/', UserCtrl.deleteUser);
router.get('/x',UserCtrl.deleteAll);

module.exports = router;