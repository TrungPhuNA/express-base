const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const petController = require('../../controllers/admin/petController');

/**
 * @swagger
 * tags:
 *   name: Admin Pets
 *   description: Admin pet management
 */

/**
 * @swagger
 * /admin/pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Admin Pets]
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
 *         description: Successfully retrieved all pets
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
 *                     pets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The pet ID
 *                           name:
 *                             type: string
 *                             description: The pet name
 *                           type:
 *                             type: string
 *                             description: The pet type
 *                           age:
 *                             type: integer
 *                             description: The pet age
 *                           owner:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               email:
 *                                 type: string
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
router.get('/', auth, petController.getAllPets);

module.exports = router;
