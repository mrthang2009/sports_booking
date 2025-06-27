const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venue.controller');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Quản lý sân thể thao
 */

/**
 * @swagger
 * /api/venues:
 *   post:
 *     summary: Tạo mới sân thể thao
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       201:
 *         description: Đã tạo sân
 */
router.post('/', auth, role(['owner', 'admin']), venueController.createVenue);

/**
 * @swagger
 * /api/venues:
 *   get:
 *     summary: Lấy danh sách sân thể thao
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: Danh sách sân
 */
router.get('/', venueController.getVenues);

/**
 * @swagger
 * /api/venues/{id}:
 *   get:
 *     summary: Lấy chi tiết sân thể thao
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết sân
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', venueController.getVenue);

/**
 * @swagger
 * /api/venues/{id}/review:
 *   post:
 *     summary: Thêm đánh giá cho sân
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã thêm đánh giá
 */
router.post('/:id/review', auth, venueController.addReview);

module.exports = router; 