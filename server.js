const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(__dirname));

// In-memory data store for blogs
let blogs = [];

// --- API ROUTES ---

// 1. Get all blogs
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

// 2. Get a single blog by ID
app.get('/api/blogs/:id', (req, res) => {
  const index = parseInt(req.params.id);
  if (index >= 0 && index < blogs.length) {
    res.json(blogs[index]);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

// 3. Create a new blog
app.post('/api/blogs', (req, res) => {
  const { title, author, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const newBlog = { title, author: author || 'Anonymous', content };
  blogs.push(newBlog);
  res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
});

// 4. Update a blog
app.put('/api/blogs/:id', (req, res) => {
  const index = parseInt(req.params.id);
  const { title, author, content } = req.body;

  if (index >= 0 && index < blogs.length) {
    blogs[index] = {
      title: title || blogs[index].title,
      author: author || blogs[index].author,
      content: content || blogs[index].content
    };
    res.json({ message: 'Blog updated successfully', blog: blogs[index] });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

// 5. Delete a blog
app.delete('/api/blogs/:id', (req, res) => {
  const index = parseInt(req.params.id);
  if (index >= 0 && index < blogs.length) {
    blogs.splice(index, 1);
    res.json({ message: 'Blog deleted successfully' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

// --- HTML ROUTE FALLBACKS ---

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/add-blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'add-blog.html'));
});

app.get('/edit-blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'edit-blog.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});