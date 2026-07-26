const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Public folder-la irukku HTML files-a direct static-a serve panna
app.use(express.static(path.join(__dirname, 'public')));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add Blog Page
app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-blog.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);});
