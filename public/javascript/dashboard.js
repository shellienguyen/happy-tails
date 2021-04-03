// Radio button filters for dog deameanor
const btn = document.querySelector('button');
btn.addEventListener('click', async (clickEvent) => {
   clickEvent.preventDefault();
   const radios = document.querySelector('input[type="radio"]:checked');
   const c_demeanor = parseInt(radios.value);

   if (c_demeanor === 4) {
      document.location.replace('/dashboard');
   }
   else {
      document.location.replace(`/dashboard/d/${c_demeanor}`)
   };
});

// jquery dropdown functionality
$('.dropdown-trigger').dropdown();

// Dropdown filter for dogs that still need to be walked
document.querySelector('#need-walk').addEventListener("click", async(clicktEvent) => {
   document.location.replace(`/dashboard/f/needWalk`);
});

// Dropdown filter for dogs that still need potty
document.querySelector('#need-potty').addEventListener("click", async(clicktEvent) => {
   console.log('========================');
   console.log('Inside needPotty ...');
   document.location.replace(`/dashboard/f/needPotty`);
});

// Dropdown filter for dogs that have been walked
document.querySelector('#have-walked').addEventListener("click", async(clicktEvent) => {
   document.location.replace(`/dashboard/f/haveWalked`);
});

// Dropdown filter for dogs that have gotten their potty
document.querySelector('#have-potty').addEventListener("click", async(clicktEvent) => {
   document.location.replace(`/dashboard/f/havePotty`);
});

// Dropdown filter for dogs that have been walked AND have gotten their potty
document.querySelector('#all-happy').addEventListener("click", async(clicktEvent) => {
   document.location.replace(`/dashboard/f/allHappy`);
});

// Dropdown filter for dogs that still need either a walk or a potty
document.querySelector('#all-sad').addEventListener("click", async(clicktEvent) => {
   document.location.replace(`/dashboard/f/allSad`);
});
