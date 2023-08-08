// const loginForm = document.getElementById('login-form');
// 
// async function loginUser(event) {
//   event.preventDefault();
// 
//   const formData = new FormData(loginForm);
//   const email = formData.get('email');
//   const password = formData.get('password');
// 
//   try {
//     const response = await fetch('/controllers/user-routes.js', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
// 
//     if (response.ok) {
//       const data = await response.json();
//       
//       window.location.href = '/dashboard';
//     } else {
//       const errorData = await response.json();
//       
//       console.log('Login failed:', errorData.message);
//     }
//   } catch (error) {
//     
//     console.error('An error occurred during login:', error);
//   }
// }
// 
// loginForm.addEventListener('submit', loginUser);

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
        const response = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');

      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
