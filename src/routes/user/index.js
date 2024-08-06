const express = require('express');
const router = express.Router();

router.use('/profile', require('./profile'));
router.use('/pets', require('./pet'));
router.use('/reviews', require('./review'));

module.exports = router;
