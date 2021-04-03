const btn = document.querySelector('button');

btn.addEventListener('click', async (clickEvent) => {
   clickEvent.preventDefault();
   const radios = document.querySelector('input[type="radio"]:checked');
   const c_demeanor = parseInt(radios.value);

console.log('!!!!!!!!!!!!!!!!!!!!!!!');
console.log(c_demeanor);

   if (c_demeanor === 4) {
      document.location.replace('/dashboard');
   }
   else {
      document.location.replace(`/dashboard/d/${c_demeanor}`)
   };
});

// jquery dropdown functionality
$('.dropdown-trigger').dropdown();

//const viewSelected = document.querySelector("#need-walk");


document.querySelector('#need-walk').addEventListener("click", async(clicktEvent) => {
   //const viewSelected = document.querySelector(".li-item").value;
   //const viewSelected = clicktEvent.target;
   document.location.replace(`/dashboard/f/needWalk`);

console.log('////////');
console.log(viewSelected);
console.log(clicktEvent.target);
console.log('////////');
   /* clicktEvent.preventDefault();

   if( clicktEvent.target && clicktEvent.target.matches("li.item")) {
console.log('//////////////////////////////');
console.log(clicktEvent.target);
console.log('//////////////////////////////');
   }; */
});

// jquery dropdown functionality
//$('.dropdown-trigger').dropdown();


// function happy_tail() {
//     // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
//     if (has_walked_am && has_potty_am || has_walked_pm && has_potty_pm) {
//         let statusEmoji = document.querySelector('.status-emoji');

//         statusEmoji.innerHTML = "&#128513";
//     }
// };

//happy_tail();
