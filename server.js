const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Create a new instance of the Telegram bot with your bot's API token
const botToken = '7121608421:AAHWYzdHudL_VNweAult8BZk8B4ui7iSdhU';
const bot = new TelegramBot(botToken, { polling: false });

// Set up an empty set to store allowed usernames
let allowedUsernames = new Set();

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the "/allow" command to add users allowed to receive form submissions
bot.onText(/\/allow (.+)/, (msg, match) => {
    const adminUsername = 'Anonymous254ORG'; // Replace with your admin username
    const usernameToAdd = match[1];

    // Check if the sender is the admin
    if (msg.from.username === adminUsername) {
        // Add the specified username to the set
        allowedUsernames.add(usernameToAdd);

        // Send a confirmation message to the admin
        bot.sendMessage(msg.chat.id, `User ${usernameToAdd} has been allowed to receive form submissions.`);
    } else {
        // Send a message indicating that the user is not authorized
        bot.sendMessage(msg.chat.id, `You are not authorized to perform this action.`);
    }
});

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    // Handle form submission
    console.log('Form submitted:', req.body);
    
    // Send form data to allowed users
    allowedUsernames.forEach(username => {
        const message = `
            New form submission:
            First Name: ${req.body.first_name}
            Last Name: ${req.body.last_name}
            Phone Number: ${req.body.phone_number}
            WhatsApp Number: ${req.body.whatsapp_number}
            Email: ${req.body.email}
            School/Campus: ${req.body.school_campus}
            Unit: ${req.body.select_your_unit}
            District: ${req.body.district}
        `;
        
        bot.sendMessage(username, message)
            .then(() => {
                console.log('Form data sent to Telegram bot successfully');
            })
            .catch((error) => {
                console.error('Error sending form data to Telegram bot:', error.message);
            });
    });

    // Send a response to trigger a redirect back to the previous page
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
