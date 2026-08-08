// Function to get blogs from localStorage
function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs")) || [];
}

// Function to save blogs to localStorage
function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

// DOM Event Listener
document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById("blogList");
  const blogForm = document.getElementById("blogForm");
  const editForm = document.getElementById("editForm");

  // --- 1. HOME PAGE (Display Blogs) ---
  if (blogList) {
    const blogs = getBlogs();

    if (blogs.length === 0) {
      blogList.innerHTML = "<p>No blogs found. Click 'Add Blog' to create one!</p>";
      return;
    }

    blogList.innerHTML = blogs.map((blog, index) => `
      <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <small>Author: ${blog.author || 'Anonymous'}</small><br><br>
        <a href="edit-blog.html?id=${index}" style="background-color: #007bff; color: white; padding: 6px 12px; text-decoration: none; border-radius: 3px; font-size: 14px; margin-right: 10px;">Edit</a>
        <button onclick="deleteBlog(${index})" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Delete</button>
      </div>
    `).join("");
  }

  // --- 2. ADD BLOG PAGE ---
  if (blogForm) {
    blogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const content = document.getElementById("content").value;

      const blogs = getBlogs();
      blogs.push({ title, author, content });
      saveBlogs(blogs);

      const message = document.getElementById("message");
      if (message) {
        message.innerHTML = "<p style='color: green;'>Blog added successfully!</p>";
      }

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }

  // --- 3. EDIT BLOG PAGE ---
  if (editForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const blogIndex = urlParams.get("id");
    const blogs = getBlogs();

    if (blogIndex !== null && blogs[blogIndex]) {
      const blog = blogs[blogIndex];
      document.getElementById("title").value = blog.title;
      document.getElementById("author").value = blog.author || "";
      document.getElementById("content").value = blog.content;

      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        blogs[blogIndex] = {
          title: document.getElementById("title").value,
          author: document.getElementById("author").value,
          content: document.getElementById("content").value
        };

        saveBlogs(blogs);

        const message = document.getElementById("message");
        if (message) {
          message.innerHTML = "<p style='color: green;'>Blog updated successfully!</p>";
        }

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      });
    } else {
      const message = document.getElementById("message");
      if (message) {
        message.innerHTML = "<p style='color: red;'>Blog not found!</p>";
      }
    }
  }
});

// --- 4. DELETE BLOG FUNCTION ---
function deleteBlog(index) {
  let blogs = getBlogs();
  blogs.splice(index, 1);
  saveBlogs(blogs);
  location.reload();
}