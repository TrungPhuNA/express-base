const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productController');
const auth = require('../../middleware/auth');

// Lấy danh sách sản phẩm
router.get('/', auth, productController.getAllProducts);

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', auth, productController.getProductById);

// Tạo sản phẩm mới
router.post('/', auth, productController.createProduct);

// Cập nhật sản phẩm
router.put('/:id', auth, productController.updateProduct);

// Xóa sản phẩm
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
