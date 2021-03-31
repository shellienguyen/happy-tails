/* const btn = document.querySelector('button');

btn.addEventListener('click', async (clickEvent) => {
   clickEvent.preventDefault();
   const radios = document.querySelector('input[type="radio"]:checked');
   const c_demeanor = parseInt(radios.value);
   console.log('@@@@@@@@@@@@');
   console.log(c_demeanor);

   if (c_demeanor === 4) {
      console.log('@@@@@@@@@@@@');
      console.log('selected all');
      document.location.reload('/dashboard');
   }
   else {
      const response = await fetch(`/api/dashboard/${c_demeanor}`, {
         method: 'POST',
         body: JSON.stringify({ c_demeanor }),
         headers: { 'Content-Type': 'application/json'}
      });

      if (response.ok) {
         document.location.reload('/dashboard');
      }
      else {
         alert(response.statusText);
      };
   };
});

// jquery dropdown functionality
// $('.dropdown-trigger').dropdown();

// function happy_tail() {
//     // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
//     if (has_walked_am && has_potty_am || has_walked_pm && has_potty_pm) {
//         let statusEmoji = document.querySelector('.status-emoji');

//         statusEmoji.innerHTML = "&#128513";
//     }
// };

// happy_tail(); */