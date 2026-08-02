const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and Form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// In-Memory JS Array to store blog posts
let blogs = [];

// GET: Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET: Add Blog Page
app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-blog.html'));
});

// GET API: Fetch all blogs for Home Page
app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});

// GET API: Fetch single blog by ID (For Edit Form Pre-fill)
app.get('/api/blogs/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
});

// POST API: Add New Blog Post
app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required!');
    }
    const newBlog = {
        id: blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1,
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };
    blogs.push(newBlog);
    res.redirect('/');
});

// POST API: Update Existing Blog Post (Day 8 Task)
app.post('/api/blogs/update/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const { title, content } = req.body;

    const blogIndex = blogs.findIndex(b => b.id === blogId);
    if (blogIndex !== -1) {
        blogs[blogIndex].title = title;
        blogs[blogIndex].content = content;
        blogs[blogIndex].date = new Date().toLocaleDateString() + ' (Edited)';
    }

    res.redirect('/');
});

// DELETE API: Delete Blog Post by ID (Day 9 Task 🔥)
app.delete('/api/blogs/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    blogs = blogs.filter(b => b.id !== blogId);
    res.json({ success: true, message: 'Blog deleted successfully!' });
});

// Start Server
app.listen(PORT, () => {
    console.log('🚀 Server running on http://localhost:' + PORT);
});