const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory JS Array
let blogs = [];

// GET Routes (Serving HTML Pages)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-blog.html'));
});

app.get('/edit-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit-blog.html'));
});

// GET APIs
app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});

app.get('/api/blogs/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
});

// POST API: Add New Blog
app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).send('Title and content required!');
    
    const newBlog = {
        id: blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1,
        title,
        content,
        date: new Date().toLocaleDateString()
    };
    blogs.push(newBlog);
    res.redirect('/');
});

// POST API: Update Blog
app.post('/api/blogs-update', (req, res) => {
    const { id, title, content } = req.body;
    const blogId = parseInt(id);

    const blogIndex = blogs.findIndex(b => b.id === blogId);
    if (blogIndex !== -1) {
        blogs[blogIndex].title = title;
        blogs[blogIndex].content = content;
        blogs[blogIndex].date = new Date().toLocaleDateString() + ' (Edited)';
    }

    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});
setInterval(()=>{},1000000);