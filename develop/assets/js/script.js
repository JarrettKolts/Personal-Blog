    const postForm = document.getElementById('post-form');
    const blogPostsSection = document.getElementById('blog-posts');
    const modeToggle = document.getElementById('mode-toggle');

    // Load saved posts from local storage
    loadPosts();

    // Load mode from local storage
    const darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'));
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        modeToggle.checked = true;
    }

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        addBlogPost(title, content, true);

        postForm.reset();
    });

    modeToggle.addEventListener('change', function() {
        const isDarkMode = modeToggle.checked;
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkModeEnabled', JSON.stringify(isDarkMode));
    });

    function addBlogPost(title, content, save = false) {
 
        if (save) {
            savePostToLocalStorage(title, content);
            window.location.href = "./blog.html";
        }
    }

    function savePostToLocalStorage(title, content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function removePostFromLocalStorage(title, content) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.title !== title || post.content !== content);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => addBlogPost(post.title, post.content));
    }