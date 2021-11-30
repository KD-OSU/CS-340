// patrons.js

// Client-side javascript for manipulating the DOM and making http requests from the patrons page

// Pre-populate the update form when patronID is selected
let patronSelector =document.getElementById('update-id');

patronSelector.addEventListener('change', function(){
    console.log('triggered');
    selectedID = patronSelector.value;
    
    // get the existing data from relevant table cells 
    selectedfName = document.getElementById(`${selectedID}fName`).innerText;
    selectedlName = document.getElementById(`${selectedID}lName`).innerText;
    selectedBirthDate = toDateFormat(document.getElementById(`${selectedID}birthDate`).innerText);
    selectedFlagged = document.getElementById(`${selectedID}flagged`).innerText;

    // get the form inputs
    fNameCell =document.getElementById('update-fName');
    lNameCell =document.getElementById('update-lName');
    birthDateCell =document.getElementById('update-birthDate');
    flaggedCell =document.getElementById('update-flagged');

    console.log (fNameCell);

    // pre-populate the form with existing data
    fNameCell.value = selectedfName;
    lNameCell.value = selectedlName;
    birthDateCell.value = selectedBirthDate;
    flaggedCell.checked = (selectedFlagged == '1') ? true : false;

});

// Updating a patron
let updatePatronForm = document.getElementById('updatePatronForm');
                               document.getElementById

updatePatronForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Form inputs
    let inputID = document.getElementById('update-id');
    let inputFirstName = document.getElementById('update-fName');
    let inputLastName = document.getElementById('update-lName');
    let inputBirthDate = document.getElementById('update-birthDate');
    let inputFlagged = document.getElementById('update-flagged');

    // Input values
    let inputIDValue = inputID.value;
    let firstNameValue = inputFirstName.value
    let lastNameValue = inputLastName.value;
    let birthDateValue = inputBirthDate.value;
    // The checkboxes don't have a value, they just have a 'checked' property
    let flaggedValue = inputFlagged.checked ? 1 : 0;

    // Create object
    let data = {
        fName: firstNameValue,
        lName: lastNameValue,
        birthDate: birthDateValue,
        flagged : flaggedValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/patrons/${inputIDValue}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell ajax request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update existing row in table
            updateTableRow(xhttp.response);

            // Clear input fields to allow for another insert
            inputID.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputBirthDate.value = '';
            inputFlagged.checked = false;
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request and wait for response
    xhttp.send(JSON.stringify(data));
})

updateTableRow = (data) => {
    
    let updatedRow = JSON.parse(data)[0];               // Get updated results from db
    

    idCell = document.getElementById(`${updatedRow.patronID}ID`)
    firstNameCell = document.getElementById(`${updatedRow.patronID}fName`)
    lastNameCell = document.getElementById(`${updatedRow.patronID}lName`)
    birthDateCell = document.getElementById(`${updatedRow.patronID}birthDate`)
    flaggedCell = document.getElementById(`${updatedRow.patronID}flagged`)

    // Fill cells with data
    idCell.innerText = updatedRow.patronID;
    firstNameCell.innerText = updatedRow.fName;
    lastNameCell.innerText = updatedRow.lName;
    birthDateCell.innerText = toLocalDate(updatedRow.birthDate);
    flaggedCell.innerText = updatedRow.flagged;
}


// Adding a patron

let addPatronForm = document.getElementById('addPatronForm');

addPatronForm.addEventListener("submit", function(e) {

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