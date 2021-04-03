//const { shift_change } = require("../../utils/helpers");

const shift_change = function () {
   // let currentHour = moment().hour();
   let today = new Date();
   let currentHour = today.getHours();

   if (currentHour >= 0 && currentHour <= 11) {
      return true;
   }

   return false;
 };

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

// If AM shift
if (shift_change()) {
   // AM: Dropdown filter for dogs that still need to be walked
   document.querySelector('#need-walk-am').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/needWalkAM`);
   });

   // AM: Dropdown filter for dogs that still need potty
   document.querySelector('#need-potty-am').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/needPottyAM`);
   });

   // AM: Dropdown filter for dogs that have been walked
   document.querySelector('#have-walked-am').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/haveWalkedAM`);
   });

   // AM: Dropdown filter for dogs that have gotten their potty
   document.querySelector('#have-potty-am').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/havePottyAM`);
   });

   // AM: Dropdown filter for dogs that have been walked AND have gotten their potty
   document.querySelector('#all-happy-am').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/allHappyAM`);
   });

   // AM: Dropdown filter for dogs that still need either a walk, a potty, or both
   document.querySelector('#all-sad-am').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/allSadAM`);
   });
}
// Else if PM shift
else {
   // PM: Dropdown filter for dogs that still need to be walked
   document.querySelector('#need-walk-pm').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/needWalkPM`);
   });

   // PM: Dropdown filter for dogs that still need potty
   document.querySelector('#need-potty-pm').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/needPottyPM`);
   });

   // PM: Dropdown filter for dogs that have been walked
   document.querySelector('#have-walked-pm').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/haveWalkedPM`);
   });

   // PM: Dropdown filter for dogs that have gotten their potty
   document.querySelector('#have-potty-pm').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/havePottyPM`);
   });

   // PM: Dropdown filter for dogs that have been walked AND have gotten their potty
   document.querySelector('#all-happy-pm').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/allHappyPM`);
   });

   // PM: Dropdown filter for dogs that still need either a walk, a potty, or both
   document.querySelector('#all-sad-pm').addEventListener("click", async(clicktEvent) => {
      document.location.replace(`/dashboard/f/allSadPM`);
   });
};