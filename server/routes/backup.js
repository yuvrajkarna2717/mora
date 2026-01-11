const express = require('express');
const { authenticateToken } = require('./auth');
const supabase = require('../config/database');

const router = express.Router();

// Create backup
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.user.userId;

    const { error } = await supabase
      .from('backups')
      .insert({
        user_id: userId,
        data: data,
        backup_type: 'manual',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    res.json({ success: true, message: 'Data backed up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Backup failed' });
  }
});

// List all backups
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { data, error } = await supabase
      .from('backups')
      .select('id, backup_type, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list backups' });
  }
});

// Download latest backup
router.get('/download', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'No backups found' });
      }
      throw error;
    }

    const filename = `mora-backup-${new Date(data.created_at).toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(data.data);
  } catch (error) {
    console.error('Download backup error:', error);
    res.status(500).json({ success: false, message: 'Failed to download backup' });
  }
});

// Download specific backup
router.get('/download/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const backupId = req.params.id;

    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .eq('id', backupId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Backup not found' });
      }
      throw error;
    }

    const filename = `mora-backup-${new Date(data.created_at).toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(data.data);
  } catch (error) {
    console.error('Download backup error:', error);
    res.status(500).json({ success: false, message: 'Failed to download backup' });
  }
});

// Restore backup
router.post('/restore/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const backupId = req.params.id;

    const { data, error } = await supabase
      .from('backups')
      .select('*')
      .eq('user_id', userId)
      .eq('id', backupId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Backup not found' });
      }
      throw error;
    }

    res.json({ 
      success: true, 
      message: 'Backup data retrieved for restoration',
      data: data.data,
      metadata: {
        backupDate: data.created_at,
        totalDays: Object.keys(data.data || {}).length,
        totalSites: [...new Set(Object.values(data.data || {}).flatMap(day => Object.keys(day)))].length
      }
    });
  } catch (error) {
    console.error('Restore backup error:', error);
    res.status(500).json({ success: false, message: 'Failed to restore backup' });
  }
});

// Delete all backups
router.delete('/delete-all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { error } = await supabase
      .from('backups')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ 
      success: true, 
      message: 'All backups deleted successfully' 
    });
  } catch (error) {
    console.error('Delete all backups error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete backups' });
  }
});

// Auto backup settings
router.get('/auto-status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('auto_backup')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ 
      success: true, 
      autoBackupEnabled: data?.auto_backup || false 
    });
  } catch (error) {
    console.error('Auto backup status error:', error);
    res.status(500).json({ success: false, message: 'Failed to get auto backup status' });
  }
});

router.post('/auto-toggle', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get current preference
    const { data: current, error: fetchError } = await supabase
      .from('user_preferences')
      .select('auto_backup')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const newValue = !(current?.auto_backup ?? false);

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        auto_backup: newValue,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;

    res.json({ 
      success: true, 
      autoBackupEnabled: newValue,
      message: `Auto backup ${newValue ? 'enabled' : 'disabled'} successfully` 
    });
  } catch (error) {
    console.error('Auto backup toggle error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle auto backup' });
  }
});
module.exports = router;