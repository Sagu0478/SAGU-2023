const bcrypt = require("bcryptjs");
const { query } = require("../../server/db.js");

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, item, quantity } = req.body;

      if (!userId || !item || !quantity) {
        return res
          .status(400)
          .json({ message: "Please provide user ID, item, and quantity" });
      }

      await query(
        "INSERT INTO user_preferences (user_id, item, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)",
        [userId, item, quantity]
      );

      res
        .status(200)
        .json({ message: "User preferences updated successfully" });
    } catch (error) {
      console.error("Preferences error:", error);
      res
        .status(500)
        .json({
          message: "Failed to update user preferences",
          error: error.message,
        });
    }
  } else {
    res.status(405).end();
  }
}

module.exports = handler;
