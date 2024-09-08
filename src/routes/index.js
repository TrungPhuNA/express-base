const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
router.use('/products', require('./product'));
router.use('/order', require('./order'));
router.use('/categories', require('./category'));
// router.use('/scrape', require('./scrape'));

// router.use('/guest', require('./guest/guest'));

module.exports = router;
