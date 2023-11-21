const loginHandler = async (event) => {
  event.preventDefault();

  // // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


const signupHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()
  const confirmation = document.getElementById("signupConfirmation")


  if (username && password) {
    const response = await fetch("/api/user/signup", {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response)

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      confirmation.textcontent = `The username you selected is already taken, please try again`
    }
  }
}



document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler)

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupHandler)