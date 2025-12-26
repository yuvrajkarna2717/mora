const express = require('express');
const { authenticateToken } = require('./auth');
const supabase = require('../config/database');
const router = express.Router();

// Check if user has accepted privacy policy
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('privacy_policy_accepted')
      .eq('id', req.user.userId)
      .single();
    
    if (error || !data) {
      // New user or user not found - default to false
      return res.json({ accepted: false });
    }
    
    res.json({ accepted: data.privacy_policy_accepted || false });
  } catch (error) {
    console.error('Privacy policy status error:', error);
    res.status(500).json({ error: 'Failed to check privacy policy status' });
  }
});

// Accept privacy policy
router.post('/accept', authenticateToken, async (req, res) => {
  try {
    console.log("User accepting privacy policy:", req.user);
    const { error } = await supabase
      .from('users')
      .update({ 
        privacy_policy_accepted: true, 
        privacy_policy_accepted_at: new Date().toISOString() 
      })
      .eq('id', req.user.userId);
    
    if (error) throw error;
    
    res.json({ success: true });
  } catch (error) {
    console.error('Privacy policy accept error:', error);
    res.status(500).json({ error: 'Failed to accept privacy policy' });
  }
});

module.exports = router;