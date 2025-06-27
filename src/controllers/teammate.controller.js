const TeammatePost = require('../models/teammate.model');

exports.createPost = async (req, res) => {
  try {
    const post = new TeammatePost({ ...req.body, creator: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await TeammatePost.find().populate('venue creator joinedPlayers.user');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await TeammatePost.findById(req.params.id).populate('venue creator joinedPlayers.user');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.joinPost = async (req, res) => {
  try {
    const post = await TeammatePost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.joinedPlayers.length >= post.requiredPlayers) return res.status(400).json({ message: 'Post is full' });
    post.joinedPlayers.push({ user: req.user._id, message: req.body.message });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.handleJoinRequest = async (req, res) => {
  try {
    const post = await TeammatePost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const player = post.joinedPlayers.id(req.body.playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    player.status = req.body.status; // 'accepted' or 'rejected'
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 