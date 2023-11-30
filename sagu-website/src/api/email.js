require('dotenv').config({ path: '../.env.local' });

// Modules for the emailing system
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;  // Create a new OAuth2 variable from the google.auth module

// Create a new instance of OAuth2 class for the project
// With the client ID and secret, taken from the 
// Google cloud console project of the app
const oauth2Client = new OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    "https://accounts.google.com/o/oauth2/auth",
);

// Set credentials to the refresh token taken from https://developers.google.com/oauthplayground/
oauth2Client.setCredentials({
    refresh_token: process.env.MAIL_REFRESH_TOKEN,
});

// Define the scopes for accessing Gmail APi
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Create the authorization URL with the created scope and set the access type
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',  // Application is requestion offline access
    scope: SCOPES,
});

// Nodemailer transporter for sending emails through Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: process.env.MAIL_ACCESS_TOKEN,
    }
});

// Helper function to validate the email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function handler(req, res) {
    // Grab all the necessary variables to create the Email draft from the web page
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    // FIrst check if the email inputed by the user is valid
    if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email address." });
    }

    try {
        // Create the mail options with nodemailer to send an email
        const mailOptions = {
            from: email,
            to: process.env.MAIL_USERNAME,
            subject: `${ subject } - ${ email }`,
            text: `Dear SAGU family,\n\nMy name is ${ name }\n${ message }\n\nSincerely,\n${ name }`,
        }

        // Send the email wth the transporter
        transporter.sendMail(mailOptions, function(error, data) {
            // Error checking
            if (error) {
                console.error(`Error sending mail credentials: ${ error }`);
                res.status(500).json({ error: 'Failed to send email!' });
            } else {
                console.log('Email sent successfully!');
                res.status(200).json({ message: 'Email sent successfully!' });
            }
        });
    } catch (err) {
        console.error(`Error sending email: ${ err }`);
        res.status(500).json({ error: 'Failed to send email.' });
    }
}

module.exports = handler;