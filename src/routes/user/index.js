const express = require('express');
const router = express.Router();

router.use('/profile', require('./profile'));
router.use('/pets', require('./pet'));
router.use('/reviews', require('./review'));
router.use('/services-registration', require('./serviceRegistration'));
router.use('/services', require('./service'));
router.use('/posts', require('./post'));
router.use('/menus', require('./menu'));
router.use('/boarding', require('./boarding'));
router.use('/order', require('./order'));
router.use('/rating', require('./rating'));
router.use('/consultation', require('./consultation'));
router.use('/products', require('./product'));

module.exports = router;
