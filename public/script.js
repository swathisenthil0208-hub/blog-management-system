document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');
    const blogList = document.getElementById('blogList');

    // 1. Home Page-la Blogs Fetch Panni Display Panra Logic
    if (blogList) {
        fetch('/api/blogs')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(blogs => {
                if (!Array.isArray(blogs) || blogs.length === 0) {
                    blogList.innerHTML = '<p style="color: gray;">No blogs published yet. Add one!</p>';
                    return;
                }

                blogList.innerHTML = blogs.map(blog => `
                    <div class="blog-card" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 8px;">
                        <h3 style="margin-top: 0;">${blog.title}</h3>
                        <small style="color: gray;">Published on: ${blog.date}</small>
                        <p style="margin-top: 10px;">${blog.content}</p>
                    </div>
                `).join('');
            })
            .catch(err => {
                console.error('Error fetching blogs:', err);
                blogList.innerHTML = '<p style="color: red;">Failed to load blogs.</p>';
            });
    }

    // 2. Add Blog Form Validation Logic
    if (blogForm) {
        const titleInput = document.getElementById('title');
        const contentInput = document.getElementById('content');
        const messageBox = document.getElementById('message');

        blogForm.addEventListener('submit', (e) => {
            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            if (title === '' || content === '') {
                e.preventDefault();
                messageBox.textContent = '❌ Please fill out all fields!';
                messageBox.style.color = 'red';
                return;
            }

            if (title.length < 5) {
                e.preventDefault();
                messageBox.textContent = '⚠️ Title must be at least 5 characters long!';
                messageBox.style.color = 'orange';
                return;
            }
        });
    }
})