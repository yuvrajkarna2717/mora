const express = require('express');
const { authenticateToken } = require('./auth');
const supabase = require('../config/database');

const router = express.Router();

// Save usage data
router.post('/save', authenticateToken, async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.user.userId;

    // Store data in database
    const { error } = await supabase
      .from('usage_data')
      .insert({
        user_id: userId,
        data: data,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    res.json({ success: true, message: 'Usage data saved successfully' });
  } catch (error) {
    console.error('Stats save error:', error);
    res.status(500).json({ error: 'Failed to save usage data' });
  }
});

// Get usage data history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { data, error } = await supabase
      .from('usage_data')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usage history' });
  }
});

// Delete specific day data
router.delete('/day/:date', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.params;

    const { error } = await supabase
      .from('usage_data')
      .delete()
      .eq('user_id', userId)
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`);

    if (error) throw error;
    res.json({ success: true, message: 'Day data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete day data' });
  }
});

// Delete all usage data
router.delete('/all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { error } = await supabase
      .from('usage_data')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ success: true, message: 'All usage data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all usage data' });
  }
});

module.exports = router;