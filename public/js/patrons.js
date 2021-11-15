// patrons.js

// Client-side javascript for manipulating the DOM and making http requests from the patrons page

let addPersonForm = document.getElementById('addPatronForm');

addPersonForm.addEventListener("submit", function(e) {

    // Prevent the submission and refreshing of the page
    e.preventDefault();

    // Form inputs
    let inputFirstName = document.getElementById("fName");
    let inputLastName = document.getElementById("lName");
    let inputBirthDate = document.getElementById("birthDate");

    // Input values
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let birthDateValue = inputBirthDate.value;

    // Create object
    let data = {
        fName: firstNameValue,
        lName: lastNameValue,
        birthDate: birthDateValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/patrons", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell ajax request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new row to table
            addRowToTable(xhttp.response);

            // Clear input fields to allow for another insert
            inputFirstName.value = '';
            inputLastName.value = '';
            inputBirthDate.value = '';
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
    
    let currentTable = document.getElementById("patronsTableBody"); // Get the current table body
    let parsedData = JSON.parse(data);                              
    let newRow = parsedData[parsedData.length - 1];                 // Gets the last row of the current dataset
    

    // Create a row with five cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let firstNameCell = document.createElement("td");
    let lastNameCell = document.createElement("td");
    let birthDateCell = document.createElement("td");
    let flaggedCell = document.createElement("td");

    // Fill cells with data
    idCell.innerText = newRow.patronID;
    firstNameCell.innerText = newRow.fName;
    lastNameCell.innerText = newRow.lName;
    birthDateCell.innerText = toLocalDate(newRow.birthDate);
    flaggedCell.innerText = newRow.flagged;

    // Add the cells to the row in the DOM
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(birthDateCell);
    row.appendChild(flaggedCell);

    // Add row to table in DOM
    currentTable.appendChild(row);
}