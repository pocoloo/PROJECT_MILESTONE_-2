const express = require('express'); 
const path = require('path');

const app = express(); 
const port = 3001; 

// Middleware to parse form data 
app.use(express.urlencoded({ extended: true })); 

// Serve the HTML form 
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html')); 
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

    // If all validations pass, redirect to the welcome page
    res.redirect(`/welcome?username=${encodeURIComponent(username)}`);
}); 

// Serve the welcome page
app.get('/welcome', (req, res) => {
    const username = req.query.username;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome</title>
        </head>
        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: Arial, sans-serif; text-align: center; color: red; background-image: url('https://lh3.googleusercontent.com/L8LLXQeMyAQUGfxQTYZe_ByGzH7R8UC2pc2vjnpIm1QeXb7C0NGYxkF2BXlIpKVbJulpjlF9eCwhOVzY9Tl91QUw_g=s1280-w1280-h800'); background-size: cover; background-position: center center; background-repeat: no-repeat;">
            <h1 style="font-size: 3em; background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px;">${username} LOOK BEHIND YOU</h1>
        </body>
        </html>
    `);
});

// Start the server 
app.listen(port, () => { 
    console.log(`Server running on http://localhost:${port}`); 
});
