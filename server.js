const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and Form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// 1. In-Memory JavaScript Array to store blog posts
let blogs = [];

// GET Route: Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET Route: Add Blog Page
app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-blog.html'));
});

// 2. GET API: Fetch all blogs for Home Page (Day 7 Task)
app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});

// 3. POST API: Add new blog post to JS Array
app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and content are required!' });
    }

    const newBlog = {
        id: blogs.length + 1,
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };

    // Push to JS Array
    blogs.push(newBlog);
    console.log('Updated Blog Array:', blogs);

    // Redirect to Home Page
    res.redirect('/');
});

// Support legacy /add-blog POST form action
app.post('/add-blog', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and Content are required!');
    }

    const newBlog = {
        id: blogs.length + 1,
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };

    blogs.push(newBlog);
    console.log('Updated Blog Array:', blogs);

    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});