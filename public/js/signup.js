const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup')
  const password = document.querySelector('#password-signup')
  const confirmation = document.getElementById("signupConfirmation")

  if (username && password) {
    const response = await fetch("api/user", {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/blog')
    } else {
      confirmation.textcontent = `The username you selected is already taken, please try again`
    }

  }
}


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupHandler)












// const form = document.getElementById("signupForm")
// const confirmation = document.getElementById("signupConfirmation")



// function logSubmit(event) {
//   confirmation.textcontent = `Signup Complete!`
//   event.preventDefault();
// }


// form.addEventListener("submit", logSubmit)



// async function submitSignUp() {
//   const query = await fetch("api/user/signup", {
//     method: 'POST',
//     body: JSON.stringify({
//       username: username,
//       password: password,
//     }),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })

//   const result = await query.json()
//   if (result.status === 'success') {
//     // where to send user upon success
//   }
// }
