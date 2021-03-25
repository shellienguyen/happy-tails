// const { colorCode } = require("../../utils/helpers");


// let demeanor = document.querySelector("#demeanor").innerHTML;
// let tableRow = document.querySelector("tr [class='table-row']");

async function colorCode() {
    // check the value for the Doggy Demeanor and compare in if statement
    // if DD = Easy then add class .easy, if DD = Moderate add class .moderate.. etc.
    
    const tableRow = document.querySelector("tr [class='table-row']");

    const response = await fetch(`/api/canine/`, {
        method: 'GET',
        body: JSON.stringify({
            c_demeanor
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.c_demeanor === 1) {
        tableRow.classList.add("easy");
    } else if (response.c_demeanor === 2) {
        tableRow.classList.add("moderate");
    } else {
        tableRow.classList.add("hard");
    }
};

colorCode();

// select difficulty feature
function selectDifficulty() {
    // find value of checkbox.  if checked then filter by difficulty.  
    // if "Select All" checked, then set attribute checked on all and GET all 

}

// DROP DOWN EVENT LISTENER
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, options);
// });

// jquery
// $('.dropdown-trigger').dropdown();


