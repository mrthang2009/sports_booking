require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./src/routes/user.routes');
const venueRoutes = require('./src/routes/venue.routes');
const bookingRoutes = require('./src/routes/booking.routes');
const teammateRoutes = require('./src/routes/teammate.routes');
const gamePostRoutes = require('./src/routes/game_post.routes');
const joinRequestRoutes = require('./src/routes/join_request.routes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/teammates', teammateRoutes);
app.use('/api/game-posts', gamePostRoutes);
app.use('/api/join-requests', joinRequestRoutes);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chi API Documentation',
    version: '1.0.0',
    description: 'API documentation for Chi backend',
  },
  servers: [
    { url: 'http://localhost:5000', description: 'Local server' }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Đường dẫn tới các file route để tự động sinh docs
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err)); 