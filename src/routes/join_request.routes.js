const express = require('express');
const router = express.Router();
const joinRequestController = require('../controllers/join_request.controller');

/**
 * @swagger
 * tags:
 *   name: JoinRequests
 *   description: Quản lý yêu cầu tham gia trận đấu
 */

/**
 * @swagger
 * /api/join-requests:
 *   post:
 *     summary: Gửi yêu cầu tham gia trận đấu
 *     tags: [JoinRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JoinRequest'
 *     responses:
 *       201:
 *         description: Đã gửi yêu cầu
 */
router.post('/', joinRequestController.createJoinRequest);

/**
 * @swagger
 * /api/join-requests:
 *   get:
 *     summary: Lấy danh sách tất cả yêu cầu tham gia
 *     tags: [JoinRequests]
 *     responses:
 *       200:
 *         description: Danh sách yêu cầu
 */
router.get('/', joinRequestController.getJoinRequests);

/**
 * @swagger
 * /api/join-requests/{id}:
 *   get:
 *     summary: Lấy chi tiết một yêu cầu tham gia
 *     tags: [JoinRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết yêu cầu
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', joinRequestController.getJoinRequestById);

/**
 * @swagger
 * /api/join-requests/{id}:
 *   put:
 *     summary: Cập nhật yêu cầu tham gia
 *     tags: [JoinRequests]
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
 *             $ref: '#/components/schemas/JoinRequest'
 *     responses:
 *       200:
 *         description: Đã cập nhật yêu cầu
 *       404:
 *         description: Không tìm thấy
 */
router.put('/:id', joinRequestController.updateJoinRequest);

/**
 * @swagger
 * /api/join-requests/{id}:
 *   delete:
 *     summary: Xóa yêu cầu tham gia
 *     tags: [JoinRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xóa yêu cầu
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', joinRequestController.deleteJoinRequest);

module.exports = router; 