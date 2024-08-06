const express = require('express');
const router = express.Router();

router.use('/pets', require('./pet'));
router.use('/promotions', require('./promotion'));
router.use('/services', require('./service'));
router.use('/appointments', require('./appointment'));
router.use('/reviews', require('./review'));
// router.use('/profile', require('./profile'));

module.exports = router;
