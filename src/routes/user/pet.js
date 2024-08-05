const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const petController = require('../../controllers/user/petController');

/**
 * @swagger
 * tags:
 *   name: User Pets
 *   description: User pet management
 */

/**
 * @swagger
 * /user/pets:
 *   get:
 *     summary: Get user pets
 *     tags: [User Pets]
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
 *         description: Successfully retrieved user pets
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
 *                           name:
 *                             type: string
 *                           type:
 *                             type: string
 *                           age:
 *                             type: integer
 *                           owner:
 *                             type: string
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
router.get('/', auth, petController.getUserPets);

/**
 * @swagger
 * /user/pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [User Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The pet name
 *               type:
 *                 type: string
 *                 description: The pet type
 *               age:
 *                 type: integer
 *                 description: The pet age
 *     responses:
 *       201:
 *         description: Successfully created a new pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The pet ID
 *                 name:
 *                   type: string
 *                   description: The pet name
 *                 type:
 *                   type: string
 *                   description: The pet type
 *                 age:
 *                   type: integer
 *                   description: The pet age
 *                 owner:
 *                   type: string
 *                   description: The owner ID
 *       500:
 *         description: Server error
 */
router.post('/', auth, petController.createPet);

/**
 * @swagger
 * /user/pets/{id}:
 *   put:
 *     summary: Update an existing pet
 *     tags: [User Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pet to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The pet name
 *               type:
 *                 type: string
 *                 description: The pet type
 *               age:
 *                 type: integer
 *                 description: The pet age
 *     responses:
 *       200:
 *         description: Successfully updated the pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The pet ID
 *                 name:
 *                   type: string
 *                   description: The pet name
 *                 type:
 *                   type: string
 *                   description: The pet type
 *                 age:
 *                   type: integer
 *                   description: The pet age
 *                 owner:
 *                   type: string
 *                   description: The owner ID
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, petController.updatePet);

/**
 * @swagger
 * /user/pets/{id}:
 *   delete:
 *     summary: Delete an existing pet
 *     tags: [User Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pet to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the pet
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, petController.deletePet);

module.exports = router;
