document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');
    const blogList = document.getElementById('blogList');

    // Fetch and Display Blogs with Edit Button
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
                    blogList.innerHTML = '<p style="color: #64748b; text-align: center;">No blogs published yet. Add one!</p>';
                    return;
                }

                blogList.innerHTML = blogs.map(blog => `
                    <div class="blog-card">
                        <h3>${blog.title}</h3>
                        <small>📅 Published on: ${blog.date}</small>
                        <p>${blog.content}</p>
                        <a href="/edit-blog.html?id=${blog.id}" style="display: inline-block; margin-top: 12px; padding: 6px 14px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem;">✏️ Edit Blog</a>
                    </div>
                `).join('');
            })
            .catch(err => {
                console.error('Error fetching blogs:', err);
                blogList.innerHTML = '<p style="color: #ef4444; text-align: center;">Failed to load blogs.</p>';
            });
    }

    // Add Blog Form Validation
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
                messageBox.style.color = '#ef4444';
                return;
            }

            if (title.length < 5) {
                e.preventDefault();
                messageBox.textContent = '⚠️ Title must be at least 5 characters long!';
                messageBox.style.color = '#f59e0b';
                return;
            }
        });
    }
});