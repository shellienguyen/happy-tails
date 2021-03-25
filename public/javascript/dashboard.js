// const { colorCode } = require("../../utils/helpers");


// let demeanor = document.querySelector("#demeanor").innerHTML;
// let tableRow = document.querySelector("tr [class='table-row']");

function colorCode(demeanor) {
    // check the value for the Doggy Demeanor and compare in if statement
    // if DD = Easy then add class .easy, if DD = Moderate add class .moderate.. etc.
    
    const demeanor = req.body.c_demeanor;
    const tableRow = document.querySelector("tr [class='table-row']");

    console.log(demeanor);
    if (demeanor === "Easy") {
        tableRow.classList.add("easy");
    } else if (demeanor === "Moderate") {
        tableRow.classList.add("moderate");
    } else {
        tableRow.classList.add("hard");
    }
};

colorCode();

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
});
