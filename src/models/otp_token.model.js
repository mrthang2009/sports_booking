const mongoose = require('mongoose');

const otpTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp_code: { type: String, required: true }, // 6 digits
  type: { type: String, enum: ['registration', 'password_reset'], required: true },
  expires_at: { type: Date, required: true },
  is_used: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OTP_Token', otpTokenSchema); 