const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const supabase = require('../config/database');

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google profile received:', profile.id, profile.emails[0].value);
    const { data: user, error } = await supabase
      .from('users')
      .upsert({
        google_id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value
      }, { onConflict: 'google_id' })
      .select()
      .single();

    console.log('Supabase response:', { user, error });
    if (error) throw error;
    return done(null, user);
  } catch (error) {
    console.error('Google strategy error:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router.get('/google', (req, res, next) => {
  const redirect = req.query.redirect || 'dashboard';
  req.session.redirect = redirect;
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { userId: req.user.id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      const redirect = req.session.redirect || 'dashboard';
      const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
      }))}&redirect=${redirect}`;
      
      res.redirect(redirectUrl);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login?error=callback_failed`);
    }
  }
);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

router.post('/extension-auth', async (req, res) => {
  try {
    const { token, user } = req.body;
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Return success with user data
    res.json({ 
      success: true, 
      token, 
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

module.exports = { router, authenticateToken };