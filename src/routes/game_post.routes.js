const express = require('express');
const router = express.Router();
const gamePostController = require('../controllers/game_post.controller');

/**
 * @swagger
 * tags:
 *   name: GamePosts
 *   description: Quản lý các bài đăng tuyển người chơi
 */

/**
 * @swagger
 * /api/game-posts:
 *   post:
 *     summary: Tạo mới một game post
 *     tags: [GamePosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GamePost'
 *     responses:
 *       201:
 *         description: Đã tạo game post
 */
router.post('/', gamePostController.createGamePost);

/**
 * @swagger
 * /api/game-posts:
 *   get:
 *     summary: Lấy danh sách tất cả game posts
 *     tags: [GamePosts]
 *     responses:
 *       200:
 *         description: Danh sách game posts
 */
router.get('/', gamePostController.getGamePosts);

/**
 * @swagger
 * /api/game-posts/{id}:
 *   get:
 *     summary: Lấy chi tiết một game post
 *     tags: [GamePosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết game post
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', gamePostController.getGamePostById);

/**
 * @swagger
 * /api/game-posts/{id}:
 *   put:
 *     summary: Cập nhật một game post
 *     tags: [GamePosts]
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
 *             $ref: '#/components/schemas/GamePost'
 *     responses:
 *       200:
 *         description: Đã cập nhật game post
 *       404:
 *         description: Không tìm thấy
 */
router.put('/:id', gamePostController.updateGamePost);

/**
 * @swagger
 * /api/game-posts/{id}:
 *   delete:
 *     summary: Xóa một game post
 *     tags: [GamePosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xóa game post
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', gamePostController.deleteGamePost);

module.exports = router; 