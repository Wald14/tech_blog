const makeNewBlog = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#newBlogTitle').value.trim()
  const blog_content = document.querySelector('#newBlogContent').value.trim()

  if (title && blog_content) {
    const response = await fetch("/api/blog", {
      method: 'POST',
      body: JSON.stringify({ title, blog_content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new post')
    }
  }
}

document
  .querySelector('#create-blog-form')
  .addEventListener('submit', makeNewBlog)
