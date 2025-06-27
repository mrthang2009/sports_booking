const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  sports: [{ type: String }],
  images: [{ type: String }],
  description: { type: String },
  pricePerHour: { type: Number },
  amenities: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Venue', venueSchema); 