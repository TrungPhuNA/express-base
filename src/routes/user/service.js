const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const serviceController = require('../../controllers/user/serviceController');

/**
 * @swagger
 * tags:
 *   name: User Services
 *   description: Pet care service management
 */

/**
 * @swagger
 * /api/user/services:
 *   get:
 *     summary: Get all services
 *     tags: [User Services]
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
 *       - name: search
 *         in: query
 *         description: Search query for service name
 *         required: false
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         description: Type of service
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all services
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
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The service ID
 *                           name:
 *                             type: string
 *                             description: The service name
 *                           description:
 *                             type: string
 *                             description: The service description
 *                           price:
 *                             type: number
 *                             description: The service price
 *                           type:
 *                             type: string
 *                             description: The service type
 *                           totalReviews:
 *                             type: integer
 *                             description: The total number of reviews for the service
 *                           averageRating:
 *                             type: number
 *                             description: The average rating of the service
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: The date the service was created
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
router.get('/', serviceController.getAllServices);

module.exports = router;
