const Venue = require('../models/venue.model');

exports.createVenue = async (req, res) => {
  try {
    const venue = new Venue({ ...req.body, owner: req.user._id });
    await venue.save();
    res.status(201).json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    venue.reviews.push({ user: req.user._id, rating: req.body.rating, comment: req.body.comment });
    await venue.save();
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 