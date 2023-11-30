const bcrypt = require("bcryptjs");
const { query } = require("@/../../server/db.js");

async function handler(req, res) {
  // Ensure email and password are provided
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Use a prepared statement to protect against SQL injection
    const queryText = "SELECT * FROM accounts WHERE email = ?";
    const values = [req.body.email];

    // Execute the query to find the user by email
    const results = await query(queryText, values);

    // Check if user exists and if the password matches
    const user = results[0];
    if (
      results.length === 0 ||
      !(await bcrypt.compare(req.body.password, user.password))
    ) {
      // If no user or if password does not match, send an unauthorized response
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Remove the password from the user object before sending it back
    delete user.password;

    // Log user data before sending back (remove this line in production)
    console.log("User data:", user);

    // If password matches, send a success response
    res
      .status(200)
      .json({ success: true, message: "Login successful", user: user });
  } catch (error) {
    // Log and send the error message if there's an exception
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
}

module.exports = handler;
