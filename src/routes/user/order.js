const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/user/orderController');
const auth = require('../../middleware/auth');

router.get('/', auth, orderController.getAllOrder);
router.get('/:id', auth, orderController.getPostById);
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
