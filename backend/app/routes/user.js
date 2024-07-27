'use strict';

const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const userCtrl = require('../controllers/user');
const { authorize } = require('../lib/auth');
// const {
//   ADMIN, USER, PROVIDER, AUDITOR, ONSITEADMIN, ANCILLARYSTAFF,
// } = require('../../constants/roles');

const router = express.Router();


router.post('/userRegister',userCtrl.registerUser);
router.post('/login',userCtrl.login);

module.exports = router;
