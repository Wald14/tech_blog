const logout = async () => {
  console.log("logout button click")
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/login-signup');
  } else {
    console.log(response.statusText);
  }
};



try {
document
  .querySelector('#logoutBtn')
  .addEventListener('click', logout);
} catch (err) {}
