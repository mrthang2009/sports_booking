const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  status: { type: String, enum: ['creator', 'approved', 'pending'], default: 'pending' },
  joined_at: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  phone: String,
  zalo: String,
  note: String
}, { _id: false });

const gamePostSchema = new mongoose.Schema({
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  court_id: { type: mongoose.Schema.Types.ObjectId },
  sport: String,
  game_date: Date,
  time_slot: String,
  total_players: Number,
  available_slots: Number,
  skill_level_required: String,
  cost_per_person: Number,
  cost_includes: [String],
  description: String,
  contact: contactSchema,
  participants: [participantSchema],
  status: { type: String, enum: ['open', 'full', 'expired', 'cancelled', 'completed'], default: 'open' },
  expires_at: Date,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

gamePostSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Game_Post', gamePostSchema); 