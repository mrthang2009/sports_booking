const mongoose = require('mongoose');

const joinedPlayerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const teammatePostSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  sport: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  requiredPlayers: { type: Number, required: true },
  joinedPlayers: [joinedPlayerSchema],
  feePerPerson: { type: Number },
  description: { type: String },
  contact: {
    phone: { type: String },
    zalo: { type: String },
  },
  status: { type: String, enum: ['open', 'closed', 'expired'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TeammatePost', teammatePostSchema); 