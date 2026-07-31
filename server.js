const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and Form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// 1. JavaScript Array to store blog posts in memory
let blogs = [];

// GET Route: Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET Route: Add Blog Page
app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-blog.html'));
});

// 2. API / POST Route: Add blog post to the JS array
app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and content are required!' });
    }

    const newBlog = {
        id: blogs.length + 1,
        title:title,
        content:content,
        date: new Date().toLocaleDateString()
    };

    // Store in JS Array
    blogs.push(newBlog);
    console.log('Updated Blog Array:', blogs);

    // Send JSON Response or Redirect
    res.redirect('/');
});

// Also support legacy /add-blog POST if needed
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
    console.log('Updated Blog Array:', blogs);

    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
