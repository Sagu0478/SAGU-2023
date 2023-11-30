const { query } = require("@/../../server/db.js");

async function handler(req, res) {
  // Ensure email is provided
  if (!req.body.email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Validate the email address (basic validation)
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Check if the email already exists
    const checkEmailText = "SELECT email FROM subscribers WHERE email = ?";
    const checkEmailValues = [req.body.email];

    const existingEmail = await query(checkEmailText, checkEmailValues);

    if (existingEmail.length > 0) {
      // If email already exists, send a conflict response
      return res.status(409).json({ error: "Email already subscribed." });
    }

    // Insert the new subscriber
    const insertText = "INSERT INTO subscribers (email, first_name, last_name, preferences) VALUES (?, ?, ?, ?)";
    const preferences = JSON.stringify(req.body.preferences || []); // Ensure preferences is a JSON string
    const insertValues = [req.body.email, req.body.first_name, req.body.last_name, preferences];

    const result = await query(insertText, insertValues);

    // Send a confirmation response
    res.status(201).json({ success: true, message: "Subscription successful", subscriber: { email: req.body.email, preferences: req.body.preferences } });
  } catch (error) {
    // Log and send the error message if there's an exception
    console.error("Error during subscription:", error);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
}

// Helper function to validate email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = handler;
