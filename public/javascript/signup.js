async function signupFormHandler(event) {
  console.log('prevent default ')
  event.preventDefault();

  console.log('signup form handler')
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const v_fname = document.querySelector('#fname').value.trim();
  const v_lname = document.querySelector('#lname').value.trim();
  // console.log(username + v_fname + v_lname)
console.log(username);
console.log(password);
console.log(v_fname);
console.log(v_lname);

  if (username && password && v_fname && v_lname) {
    console.log('username and password filled out')
    const response = await fetch('/api/volunteer/signup', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        v_fname,
        v_lname
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response)
    if (response.ok) {
      console.log(response)
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
//document.getElementById('.signup-form').addEventListener('submit', signupFormHandler);