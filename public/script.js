// Fetch and display all blogs on the Index page
function fetchBlogs() {
    const blogList = document.getElementById('blogList');
    if (!blogList) return; // Exit if not on index page

    fetch('/api/blogs')
        .then(res => res.json())
        .then(blogs => {
            blogList.innerHTML = '';
            if (blogs.length === 0) {
                blogList.innerHTML = '<p>No blogs found. Add one!</p>';
                return;
            }

            blogs.forEach(blog => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
                blogCard.style.cssText = 'border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 6px;';
                
                blogCard.innerHTML = `
                    <h3>${blog.title}</h3>
                    <p>${blog.content}</p>
                    <small><b>Posted on:</b> ${blog.date}</small>
                    <div style="margin-top: 10px;">
                        <a href="/edit-blog.html?id=${blog.id}" style="padding: 5px 10px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">Edit</a>
                        <button onclick="deleteBlog(${blog.id})" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
                    </div>
                `;
                blogList.appendChild(blogCard);
            });
        })
        .catch(err => console.error('Error fetching blogs:', err));
}

// Function to delete a blog
function deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
        fetch('/api/blogs/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                fetchBlogs(); // Refresh blog list after delete
            }
        })
        .catch(err => console.error('Error deleting blog:', err));
    }
}

// Run fetch function on page load
document.addEventListener('DOMContentLoaded', fetchBlogs);