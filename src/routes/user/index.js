const express = require('express');
const router = express.Router();

router.use('/profile', require('./profile'));
router.use('/pets', require('./pet'));
router.use('/reviews', require('./review'));
router.use('/services-registration', require('./serviceRegistration'));
router.use('/services', require('./service'));

module.exports = router;
