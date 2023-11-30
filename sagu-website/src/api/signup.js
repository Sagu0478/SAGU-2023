const bcrypt = require("bcryptjs");
const { query } = require("../../server/db.js");

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        mobile,
        address,
      } = req.body; // Set mobile and address default to empty string

      // Basic input validation
      if (!email || !password || !firstName || !lastName) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      // Check for existing user with the same email
      const users = await query("SELECT * FROM accounts WHERE email = ?", [
        email,
      ]);
      if (users.length) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log("Signup info", { firstName, lastName, email, mobile, hashedPassword, address, point });

      // Insert the new user into the database including the address
      await query(
        "INSERT INTO accounts (first_name, last_name, email, mobile, password, address) VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, mobile, hashedPassword, address]
      );

      // Log and respond with a success message
      console.log("Account added: \n" + JSON.stringify({firstName, lastName, email, mobile, address }));
      res.status(201).json({ message: "Signup successful" }); // Use 201 for Created
    } catch (error) {
      // Log and respond with the error
      console.error("Signup error:", error);
      res.status(500).json({ message: "Signup failed", error: error.message });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", "POST");
    res.status(405).end(); // Method Not Allowed
  }
}

module.exports = handler;
