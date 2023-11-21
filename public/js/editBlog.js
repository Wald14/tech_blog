const saveBlog = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#saveBlogTitle').value.trim()
  const blog_content = document.querySelector('#saveBlogContent').value.trim()
  const blogId = document.querySelector("#edit-blog-form").getAttribute('blog_id')

  if (title && blog_content) {
    const response = await fetch(`/api/blog/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, blog_content}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post')
    }
  }
}

const deleteBlog = async (event) => {
  event.preventDefault();
  const blogId = document.querySelector("#edit-blog-form").getAttribute('blog_id')

  const response = await fetch(`/api/blog/${blogId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successful, redirect the browser to the dashboard page
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete blog')
  }

}


document
  .querySelector('#edit-blog-form')
  .addEventListener('submit', saveBlog)

document
  .querySelector('#deleteBtn')
  .addEventListener('click', deleteBlog)
