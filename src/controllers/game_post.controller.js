const GamePost = require('../models/game_post.model');

exports.createGamePost = async (req, res) => {
  try {
    const gamePost = new GamePost(req.body);
    await gamePost.save();
    res.status(201).json(gamePost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getGamePosts = async (req, res) => {
  try {
    const posts = await GamePost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGamePostById = async (req, res) => {
  try {
    const post = await GamePost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGamePost = async (req, res) => {
  try {
    const post = await GamePost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteGamePost = async (req, res) => {
  try {
    const post = await GamePost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 