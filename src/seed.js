const mongoose = require('mongoose');
const User = require('./models/user.model');
const Venue = require('./models/venue.model');
const GamePost = require('./models/game_post.model');
const JoinRequest = require('./models/join_request.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chi';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Clear collections
  await User.deleteMany({});
  await Venue.deleteMany({});
  await GamePost.deleteMany({});
  await JoinRequest.deleteMany({});

  // Seed Users
  const users = await User.insertMany([
    {
      email: 'user1@example.com',
      password: '123456',
      name: 'User One',
      avatar: '',
      phone: '0123456789',
      sports: [
        { type: 'badminton', level: 'Trung bình' },
        { type: 'football', level: 'Khá' }
      ],
      role: 'user',
      isVerified: true
    },
    {
      email: 'owner@example.com',
      password: '123456',
      name: 'Venue Owner',
      avatar: '',
      phone: '0987654321',
      sports: [
        { type: 'badminton', level: 'Giỏi' },
        { type: 'football', level: 'Khá' }
      ],
      role: 'owner',
      isVerified: true
    }
  ]);

  // Seed Venues
  const venues = await Venue.insertMany([
    {
      name: 'Sân Cầu Lông A',
      address: '123 Đường A, Quận 1, HCM',
      location: {
        lat: 10.8,
        lng: 106.7
      },
      sports: ['badminton'],
      images: [],
      description: 'Sân đẹp, rộng rãi',
      pricePerHour: 100000,
      amenities: ['parking', 'shower'],
      owner: users[1]._id
    }
  ]);

  // Seed Game_Posts
  const gamePosts = await GamePost.insertMany([
    {
      creator_id: users[0]._id,
      venue_id: venues[0]._id,
      sport: 'badminton',
      game_date: new Date(),
      time_slot: '07:00-08:00',
      total_players: 4,
      available_slots: 2,
      skill_level_required: 'Trung bình',
      cost_per_person: 25000,
      cost_includes: ['sân', 'cầu'],
      description: 'Tuyển thêm 2 người chơi cầu lông',
      contact: { phone: '0123456789', zalo: '', note: '' },
      participants: [
        { user_id: users[0]._id, name: 'User One', phone: '0123456789', status: 'creator', joined_at: new Date() }
      ],
      status: 'open',
      expires_at: new Date(Date.now() + 3600 * 1000)
    }
  ]);

  // Seed Join_Requests
  await JoinRequest.insertMany([
    {
      post_id: gamePosts[0]._id,
      user_id: users[1]._id,
      message: 'Xin tham gia trận cầu lông',
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  console.log('Seed data completed!');
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); }); 