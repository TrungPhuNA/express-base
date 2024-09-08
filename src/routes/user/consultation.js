const express = require('express');
const router = express.Router();
const consultationController = require('../../controllers/user/consultationController');
const authenticate = require('../../middleware/auth'); // Giả sử bạn đã có middleware này

// Tạo mới một yêu cầu tư vấn
router.post('/', authenticate, consultationController.createConsultation);

// Lấy tất cả các yêu cầu tư vấn của người dùng
router.get('/my-consultations', authenticate, consultationController.getConsultationsByUser);

// Cập nhật trạng thái của yêu cầu tư vấn
router.put('/:id/status', authenticate, consultationController.updateConsultationStatus);

module.exports = router;
