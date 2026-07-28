const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing form data & serving static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Temporary array to store blogs in memory
let blogs = [];

// 1. GET Route: Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. GET Route: Add Blog Page
app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-blog.html'));
});

// 3. POST Route: Save New Blog
app.post('/add-blog', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and Content are required!');
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        date: new Date().toLocaleDateString()
    };

    blogs.push(newBlog);
    console.log('New Blog Added:', newBlog);

    // Redirect to home or send success response
    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
