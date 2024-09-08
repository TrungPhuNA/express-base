const express = require('express');
const router = express.Router();
const boardingController = require('../../controllers/user/boardingController');
const auth = require('../../middleware/auth');

router.get('/', auth, boardingController.getAll);
router.get('/:id', auth, boardingController.getById);
router.post('/', auth, boardingController.create);
router.delete('/:id', auth, boardingController.delete);

module.exports = router;
