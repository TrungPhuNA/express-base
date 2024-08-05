const express = require('express');
const router = express.Router();

router.use('/profile', require('./profile'));
router.use('/pets', require('./pet'));

module.exports = router;
