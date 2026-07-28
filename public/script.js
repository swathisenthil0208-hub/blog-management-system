document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const messageBox = document.getElementById('message');

    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            // 1. Validation: Empty fields
            if (title === '' || content === '') {
                e.preventDefault(); // Stop submission on error
                messageBox.textContent = '❌ Please fill out all fields!';
                messageBox.style.color = 'red';
                messageBox.style.marginBottom = '15px';
                return;
            }

            // 2. Validation: Title length
            if (title.length < 5) {
                e.preventDefault(); // Stop submission on error
                messageBox.textContent = '⚠️ Title must be at least 5 characters long!';
                messageBox.style.color = 'orange';
                messageBox.style.marginBottom = '15px';
                return;
            }

            // Validation passed! Form will naturally submit to POST /add-blog
        });
    }
});