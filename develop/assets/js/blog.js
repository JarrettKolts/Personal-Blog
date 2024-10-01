// Select the form and necessary elements
const postForm = document.getElementById('post-form');
const blogPostsSection = document.getElementById('blog-posts');
const modeToggle = document.getElementById('mode-toggle');

// Load saved posts from local storage when the page loads
loadPosts();

// Load dark mode preference from local storage
const darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'));
if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
    modeToggle.checked = true;
}

// Add event listener for form submission
postForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const title = document.getElementById('title').value.trim(); // Get the title
    const content = document.getElementById('content').value.trim(); // Get the content

    // Make sure the title and content are not empty
    if (title && content) {
        addBlogPost(title, content, true); // Add the blog post to the page and localStorage
        postForm.reset(); // Reset the form fields
    } else {
        alert('Both title and content are required!');
    }
});

// Add event listener for dark mode toggle
modeToggle.addEventListener('change', function() {
    const isDarkMode = modeToggle.checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkModeEnabled', JSON.stringify(isDarkMode));
});

// Function to add a new blog post
function addBlogPost(title, content, save = false) {
    const post = document.createElement('div');
    post.className = 'post';

    const postTitle = document.createElement('h2');
    postTitle.textContent = title;

    const postContent = document.createElement('p');
    postContent.textContent = content;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        post.remove();
        removePostFromLocalStorage(title, content);
    });

    // Append title, content, and delete button to the post
    post.appendChild(postTitle);
    post.appendChild(postContent);
    post.appendChild(deleteButton);

    // Append the post to the blog posts section
    blogPostsSection.appendChild(post);

    // If save is true, save the post to localStorage
    if (save) {
        savePostToLocalStorage(title, content);
    }
}

// Function to save a post to localStorage
function savePostToLocalStorage(title, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ title, content }); // Add the new post to the posts array
    localStorage.setItem('posts', JSON.stringify(posts)); // Save the updated array to localStorage
}

// Function to remove a post from localStorage
function removePostFromLocalStorage(title, content) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.title !== title || post.content !== content); // Filter out the post to be deleted
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
}

// Function to load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => addBlogPost(post.title, post.content)); // Add each post to the DOM
}
