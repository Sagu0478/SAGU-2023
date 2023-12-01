// require('dotenv').config({ path: '../.env.local' });

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const { query } = require("../server/db.js");
const emailHandler = require("../src/api/email.js");
const loginHandler = require("../src/api/login.js");
const paymentHandler = require("../src/api/pay.js");
const signupHandler = require("../src/api/signup.js");
const subscribeHandler = require("../src/api/subscribe.js");
const applicationHandler = require('../src/api/emailApp.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an upload variable to specify the file destination and the file size limit
const upload = multer({
  dest: '../src/api/fileUploads',
  limit: 1000000,
});

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from SAGU");
});

app.get("/api/accounts", async (req, res) => {
  try {
    const queryText = "SELECT * FROM accounts";
    const values = [];
    const accounts = await query(queryText, values);
    res.status(200).json({ accounts: accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/subscribe", async (req, res) => {
  try {
    const queryText = "SELECT * FROM subscribers";
    const values = [];
    const subscribers = await query(queryText, values);
    res.status(200).json({ subscribers: subscribers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.post("/api/login", loginHandler);
app.post("/api/signup", signupHandler);

app.post("/api/subscribe", subscribeHandler);

app.post("/api/pay", paymentHandler);

app.post("/api/email", emailHandler);
app.post("/api/emailApp", upload.single('resume'), applicationHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

// Set the port
const PORT = process.env.LOCALHOST_PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

