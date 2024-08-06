const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validation');
const reviewController = require('../../controllers/user/reviewController');

/**
 * @swagger
 * tags:
 *   name: User Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /api/user/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [User Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: The service ID
 *               rating:
 *                 type: number
 *                 description: The rating of the service (1-5)
 *               comment:
 *                 type: string
 *                 description: The review comment
 *     responses:
 *       201:
 *         description: Successfully created a new review
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
 *                     review:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The review ID
 *                         service:
 *                           type: string
 *                           description: The service ID
 *                         rating:
 *                           type: number
 *                           description: The rating of the service
 *                         comment:
 *                           type: string
 *                           description: The review comment
 *                         user:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             email:
 *                               type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: The date the review was created
 *       500:
 *         description: Server error
 */
router.post(
    '/',
    [
        auth,
        check('service', 'Service ID is required').not().isEmpty(),
        check('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
    ],
    validate,
    reviewController.createReview
);

/**
 * @swagger
 * /reviews/service/{serviceId}:
 *   get:
 *     summary: Get reviews for a specific service
 *     tags: [User Reviews]
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: ID of the service to retrieve reviews for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the reviews
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
 *                             type: string
 *                             description: The service name
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
 *                     totalReviews:
 *                       type: integer
 *                     averageRating:
 *                       type: number
 *       500:
 *         description: Server error
 */
router.get('/service/:serviceId', reviewController.getReviewsByService);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [User Reviews]
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
router.get('/', auth, reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [User Reviews]
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
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
