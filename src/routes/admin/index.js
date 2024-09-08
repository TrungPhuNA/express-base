const express = require('express');
const router = express.Router();

router.use('/pets', require('./pet'));
router.use('/promotions', require('./promotion'));
router.use('/services', require('./service'));
router.use('/appointments', require('./appointment'));
router.use('/reviews', require('./review'));
router.use('/user', require('./user'));
router.use('/menus', require('./menu'));
router.use('/categories', require('./category'));
router.use('/order', require('./order'));
router.use('/products', require('./product'));
// router.use('/profile', require('./profile'));

module.exports = router;
