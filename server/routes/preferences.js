const express = require("express");
const supabase = require("../config/database");
const { authenticateToken } = require("./auth");

const router = express.Router();

// Delete user account
router.delete("/account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete all related data in order (due to foreign key constraints)
    await supabase.from("user_preferences").delete().eq("user_id", userId);
    await supabase.from("backups").delete().eq("user_id", userId);
    await supabase.from("usage_data").delete().eq("user_id", userId);
    
    // Finally delete the user
    const { error } = await supabase.from("users").delete().eq("id", userId);
    
    if (error) throw error;

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

module.exports = router;
