const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission with validation
app.post('/submit-form', (req, res) => {
    const username = req.body.username;

    // Check if username is empty or contains only whitespace
    if (!username || !username.trim()) {
        res.send("Error: Username is required and cannot be blank.");
        return;
    }

    // Check if username contains only letters and numbers (no special characters)
    const validUsername = /^[a-zA-Z0-9]+$/;
    if (!validUsername.test(username)) {
        res.send("Error: Username can only contain letters and numbers.");
        return;
    }

    // Check if username is too long (e.g., max 50 characters)
    if (username.length > 50) {
        res.send("Error: Username must be less than 50 characters.");
        return;
    }

    // If all validations pass, send a success response
    res.send(`Username is ${username}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
