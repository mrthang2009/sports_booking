const express = require('express');
const router = express.Router();
const teammateController = require('../controllers/teammate.controller');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Teammates
 *   description: Quản lý bài đăng tìm đồng đội
 */

/**
 * @swagger
 * /api/teammates:
 *   post:
 *     summary: Tạo bài đăng tìm đồng đội
 *     tags: [Teammates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teammate'
 *     responses:
 *       201:
 *         description: Đã tạo bài đăng
 */
router.post('/', auth, teammateController.createPost);

/**
 * @swagger
 * /api/teammates:
 *   get:
 *     summary: Lấy danh sách bài đăng tìm đồng đội
 *     tags: [Teammates]
 *     responses:
 *       200:
 *         description: Danh sách bài đăng
 */
router.get('/', teammateController.getPosts);

/**
 * @swagger
 * /api/teammates/{id}:
 *   get:
 *     summary: Lấy chi tiết bài đăng tìm đồng đội
 *     tags: [Teammates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết bài đăng
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', teammateController.getPost);

/**
 * @swagger
 * /api/teammates/{id}/join:
 *   post:
 *     summary: Gửi yêu cầu tham gia bài đăng
 *     tags: [Teammates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Đã gửi yêu cầu tham gia
 */
router.post('/:id/join', auth, teammateController.joinPost);

/**
 * @swagger
 * /api/teammates/{id}/handle-join:
 *   post:
 *     summary: Xử lý yêu cầu tham gia bài đăng
 *     tags: [Teammates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xử lý yêu cầu
 */
router.post('/:id/handle-join', auth, teammateController.handleJoinRequest);

module.exports = router; 