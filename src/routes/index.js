const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
// router.use('/guest', require('./guest/guest'));

module.exports = router;
