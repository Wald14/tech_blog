const makeComment = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const comment_content = document.getElementById('commentField').value.trim()
  const blog_id = document.querySelector("#create-comment-form").getAttribute('blog_id')

  if (comment_content) {
    const response = await fetch(`/api/comment/`, {
      method: 'POST',
      body: JSON.stringify({ comment_content, blog_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace(`/single-blog/${blog_id}`);
    } else {
      alert('Failed to create new comment')
    }
  }
}

try{
document
  .querySelector('#create-comment-form')
  .addEventListener('submit', makeComment)
} catch (err) {}
