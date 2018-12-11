const express = require("express");
const router = express.Router();
const UserCtrl = require('../controllers/user');
const auth = require('../../libs/auth');
const validation = require('../../libs/validation');

router.get('/', auth.bearerAuth, UserCtrl.getUser);
router.post('/login', UserCtrl.loginUser);
router.post('/', validation, UserCtrl.createUser);
router.put('/', auth.bearerAuth,validation, UserCtrl.saveUser);
router.put('/pass', auth.bearerAuth, UserCtrl.saveUserpsw);
router.delete('/', auth.bearerAuth, UserCtrl.deleteUser);
router.get('/x', UserCtrl.deleteAll);

module.exports = router;