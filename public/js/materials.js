// materials.js

// Client-side javascript for manipulating the DOM and making http requests from the loans page


/* 

ADD ROW FUNCTIONALITY

*/

// Make a post request and add row when addHoldFrom is submitted
let addMaterialForm = document.getElementById('addMaterialForm');

addMaterialForm.addEventListener("submit", function(e) {

    // Prevent the submission and refreshing of the page
    e.preventDefault();

    // Form inputs
    let inputTitle = document.getElementById("addTitle");
    let inputAuthor = document.getElementById("addAuthor");
    let inputMedium = document.getElementById("addMedium");
    let inputGenre = document.getElementById("addGenre");
    let inputCopies = document.getElementById("addTotalCopies");
    let inputRestricted = document.getElementById("addRestricted")

    // Input values
    let titleValue = inputTitle.value;
    let authorValue = inputAuthor.value;
    let mediumValue = inputMedium.value;
    let genreValue = inputGenre.value;
    let copiesValue = inputCopies.value;
    let restrictedValue = inputRestricted.checked;

    // Create object
    let data = {
        title: titleValue,
        author: authorValue,
        medium: mediumValue,
        genre: genreValue,
        copies: copiesValue,
        restricted : restrictedValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/materials", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell ajax request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new row to table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request and wait for response
    xhttp.send(JSON.stringify(data));

})


// Add row to table in front-end
// I think this can be a common js function that we can use use in all files if we create a loop to deal with the data
addRowToTable = (data) => {
    
    let currentTable = document.getElementById("materialsTableBody");   // Get the current table body
    let parsedData = JSON.parse(data);                              
    let newRow = parsedData[parsedData.length - 1];                 // Gets the last row of the current dataset
    
    // Create a row with six cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let authorCell = document.createElement("td");
    let titleCell = document.createElement("td");
    let mediumCell = document.createElement("td");
    let restrictedCell = document.createElement("td");
    let availableCopiesCell = document.createElement("td");
    let totalCopiesCell = document.createElement("td");
    let genreCell = document.createElement("td");    

    row.id = newRow.holdID;

    // Fill cells with data
    idCell.innerText = newRow.materialID;
    authorCell.innerText = newRow.author;
    titleCell.innerText = newRow.title;
    mediumCell.innerText = newRow.medium;
    restrictedCell.innerText = newRow.restricted;
    availableCopiesCell.innerText = newRow.availableCopies;
    totalCopiesCell.innerText = newRow.totalCopies;
    genreCell.innerText = newRow.genre;
    
    // Add the cells to the row in the DOM
    row.appendChild(idCell);
    row.appendChild(authorCell);
    row.appendChild(titleCell);
    row.appendChild(mediumCell);
    row.appendChild(restrictedCell);
    row.appendChild(availableCopiesCell);
    row.appendChild(totalCopiesCell);
    row.appendChild(genreCell);

    // Add row to table in DOM
    currentTable.appendChild(row);
}