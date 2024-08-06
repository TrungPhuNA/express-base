const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminReviewController = require('../../controllers/admin/reviewController');

/**
 * @swagger
 * tags:
 *   name: Admin Reviews
 *   description: Review management by admin
 */

/**
 * @swagger
 * /admin/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Admin Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: page_size
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The review ID
 *                           user:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           service:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                           rating:
 *                             type: number
 *                             description: The rating of the service
 *                           comment:
 *                             type: string
 *                             description: The review comment
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: The date the review was created
 *                     meta:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         total_page:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *       500:
 *         description: Server error
 */
router.get('/', auth, adminReviewController.getAllReviews);

/**
 * @swagger
 * /admin/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Admin Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the review to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, adminReviewController.deleteReview);

module.exports = router;
