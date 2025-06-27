const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Quản lý đặt sân
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           example: user1@example.com
 *         password:
 *           type: string
 *           example: 123456
 *         name:
 *           type: string
 *           example: User One
 *         avatar:
 *           type: string
 *           example: ""
 *         phone:
 *           type: string
 *           example: "0123456789"
 *         sports:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: badminton
 *               level:
 *                 type: string
 *                 example: Trung bình
 *         role:
 *           type: string
 *           example: user
 *         isVerified:
 *           type: boolean
 *           example: true
 *     Venue:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: Sân Cầu Lông A
 *         address:
 *           type: string
 *           example: 123 Đường A, Quận 1, HCM
 *         location:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *               example: 10.8
 *             lng:
 *               type: number
 *               example: 106.7
 *         sports:
 *           type: array
 *           items:
 *             type: string
 *           example: ["badminton"]
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *         description:
 *           type: string
 *           example: Sân đẹp, rộng rãi
 *         pricePerHour:
 *           type: number
 *           example: 100000
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           example: ["parking", "shower"]
 *         owner:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0e
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - venue
 *         - sport
 *         - date
 *         - timeSlot
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0d
 *         venue:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0e
 *         sport:
 *           type: string
 *           example: badminton
 *         date:
 *           type: string
 *           format: date
 *           example: 2024-07-01
 *         timeSlot:
 *           type: string
 *           example: 07:00-08:00
 *         status:
 *           type: string
 *           example: pending
 *     GamePost:
 *       type: object
 *       required:
 *         - creator_id
 *         - venue_id
 *         - sport
 *         - game_date
 *         - time_slot
 *         - total_players
 *       properties:
 *         _id:
 *           type: string
 *         creator_id:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0d
 *         venue_id:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0e
 *         sport:
 *           type: string
 *           example: badminton
 *         game_date:
 *           type: string
 *           format: date
 *           example: 2024-07-01
 *         time_slot:
 *           type: string
 *           example: 07:00-08:00
 *         total_players:
 *           type: integer
 *           example: 4
 *         available_slots:
 *           type: integer
 *           example: 2
 *         skill_level_required:
 *           type: string
 *           example: Trung bình
 *         cost_per_person:
 *           type: number
 *           example: 25000
 *         cost_includes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["sân", "cầu"]
 *         description:
 *           type: string
 *           example: Tuyển thêm 2 người chơi cầu lông
 *         contact:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *               example: 0123456789
 *             zalo:
 *               type: string
 *               example: ""
 *             note:
 *               type: string
 *               example: ""
 *         participants:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 665f1b2c3a4d5e6f7a8b9c0d
 *               name:
 *                 type: string
 *                 example: User One
 *               phone:
 *                 type: string
 *                 example: 0123456789
 *               status:
 *                 type: string
 *                 example: creator
 *               joined_at:
 *                 type: string
 *                 format: date-time
 *         status:
 *           type: string
 *           example: open
 *         expires_at:
 *           type: string
 *           format: date-time
 *     JoinRequest:
 *       type: object
 *       required:
 *         - post_id
 *         - user_id
 *       properties:
 *         _id:
 *           type: string
 *         post_id:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0f
 *         user_id:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0d
 *         message:
 *           type: string
 *           example: Xin tham gia trận cầu lông
 *         status:
 *           type: string
 *           example: pending
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Teammate:
 *       type: object
 *       required:
 *         - user
 *         - sport
 *         - date
 *         - timeSlot
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           example: 665f1b2c3a4d5e6f7a8b9c0d
 *         sport:
 *           type: string
 *           example: badminton
 *         date:
 *           type: string
 *           format: date
 *           example: 2024-07-01
 *         timeSlot:
 *           type: string
 *           example: 07:00-08:00
 *         description:
 *           type: string
 *           example: Tìm đồng đội chơi cầu lông
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Đặt sân mới
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Đã đặt sân
 */
router.post('/', auth, bookingController.createBooking);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Lấy danh sách đặt sân của tôi
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đặt sân của tôi
 */
router.get('/my', auth, bookingController.getMyBookings);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   post:
 *     summary: Hủy đặt sân
 *     tags: [Bookings]
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
 *         description: Đã hủy đặt sân
 */
router.post('/:id/cancel', auth, bookingController.cancelBooking);

module.exports = router; 