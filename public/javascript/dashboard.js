/* async function checkboxFormHandler(event) {
   event.preventDefault();
 
   const username = document.querySelector('#username-login').value.trim();
   const password = document.querySelector('#password-login').value.trim();
 
   if (username && password) {
     const response = await fetch('/api/volunteer/login', {
       method: 'post',
       body: JSON.stringify({ username, password }),
       headers: { 'Content-Type': 'application/json' }
     });
 
     if (response.ok) {
       // After successfully logged in, redirect to the dashboard
       document.location.replace('/dashboard');
     }
     else {
       alert(response.statusText);
     };
   };
 };
 
 document.querySelector('.inline').addEventListener('submit', checkboxFormHandler);
 */
// jquery dropdown functionality
// $('.dropdown-trigger').dropdown();

// function happy_tail() {
//     // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
//     if (has_walked_am && has_potty_am || has_walked_pm && has_potty_pm) {
//         let statusEmoji = document.querySelector('.status-emoji');

//         statusEmoji.innerHTML = "&#128513";
//     }
// };

// happy_tail();