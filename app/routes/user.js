const express = require("express");
const router = express.Router();
const UserCtrl = require('../controllers/user');
const auth = require('../../libs/auth');
const validation = require('../../libs/validation');
const psw = require('../../libs/psw');

router.get('/', auth.bearerAuth, UserCtrl.getUser);
router.post('/login', psw.pswCheck, UserCtrl.loginUser);
router.post('/', validation, psw.pswCreate, UserCtrl.createUser);
router.put('/', auth.bearerAuth,validation, UserCtrl.saveUser);
router.put('/pass', auth.bearerAuth, psw.pswCreate, UserCtrl.saveUserpsw);
router.delete('/', auth.bearerAuth, UserCtrl.deleteUser);
router.get('/x', UserCtrl.deleteAll);

module.exports = router;