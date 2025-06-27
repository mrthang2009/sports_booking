const JoinRequest = require('../models/join_request.model');

exports.createJoinRequest = async (req, res) => {
  try {
    const joinRequest = new JoinRequest(req.body);
    await joinRequest.save();
    res.status(201).json(joinRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getJoinRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJoinRequestById = async (req, res) => {
  try {
    const request = await JoinRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateJoinRequest = async (req, res) => {
  try {
    const request = await JoinRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ error: 'Not found' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteJoinRequest = async (req, res) => {
  try {
    const request = await JoinRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 