const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const loggingMiddleware = require('./middleware/logging');
require('dotenv').config();

const { router: authRoutes } = require('./routes/auth');
const statsRoutes = require('./routes/stats');
const backupRoutes = require('./routes/backup');
const insightsRoutes = require('./routes/insights');
const privacyRoutes = require('./routes/privacy');

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(loggingMiddleware);
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/backup', backupRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/privacy', privacyRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});