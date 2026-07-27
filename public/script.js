document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const messageBox = document.getElementById('message');

    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            // ALWAYS STOP DEFAULT FORM SUBMISSION TO BACKEND
            e.preventDefault();

            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            // Clear previous message
            messageBox.textContent = '';
            messageBox.className = '';

            // 1. Validation: Empty fields
            if (title === '' || content === '') {
                messageBox.textContent = '❌ Please fill out all fields!';
                messageBox.style.color = 'red';
                messageBox.style.marginBottom = '15px';
                return;
            }

            // 2. Validation: Title length
            if (title.length < 5) {
                messageBox.textContent = '⚠️ Title must be at least 5 characters long!';
                messageBox.style.color = 'orange';
                messageBox.style.marginBottom = '15px';
                return;
            }

            // 3. Success feedback
            messageBox.textContent = '✅ Blog published successfully (JS Verified)!';
            messageBox.style.color = 'green';
            messageBox.style.marginBottom = '15px';

            // Reset form fields after successful submit
            blogForm.reset();
        });
    }
});