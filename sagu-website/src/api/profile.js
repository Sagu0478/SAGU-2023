const bcrypt = require("bcryptjs");
const { query } = require("../../server/db.js");

async function handler(req, res) {
  try {
    const results = await query(
      "SELECT f_name FROM accounts WHERE email = ?",
      [req.body.email]
    );
  } catch (error) {
    // Log and send the error message if there's an exception
    console.error("Error during profile:", error);
    res.status(500).json({ success: false, message: "Profile failed" });
  }
}
