const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  type: { type: String },
  level: { type: String },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String },
  sports: [sportSchema],
  role: { type: String, enum: ['user', 'owner', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema); 