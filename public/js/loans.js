// loans.js
// Client-side javascript for manipulating the DOM and making http requests from the loans page


/**
 * Pre-populate the updateLoanForm when a loanID is selected
 * from the drop-down menu.
 */
let loanSelector =document.getElementById('update-id');

loanSelector.addEventListener('change', function(){
    selectedID = loanSelector.value;
    
    // get the existing data from relevant table cells 
    selectedMaterialID = document.getElementById(`${selectedID}materialID`).innerText;
    selectedPatronID = document.getElementById(`${selectedID}patronID`).innerText;
    selectedEmployeeID = document.getElementById(`${selectedID}employeeID`).innerText;
    selectedCheckout = toDateFormat(document.getElementById(`${selectedID}checkout`).innerText);
    selectedDue = toDateFormat(document.getElementById(`${selectedID}due`).innerText);
    selectedReturned = toDateFormat(document.getElementById(`${selectedID}returned`).innerText);
    
    // get the form inputs
    materialCell = document.getElementById('update-materialID');
    patronCell = document.getElementById('update-patronID');
    employeeCell = document.getElementById('update-employeeID');
    checkoutCell = document.getElementById('update-checkout');
    dueCell = document.getElementById('update-due');
    returnedCell = document.getElementById('update-returned');
    
    // pre-populate the form with existing data
    materialCell.value = selectedMaterialID;
    patronCell.value = selectedPatronID;
    employeeCell.value = selectedEmployeeID;
    checkoutCell.value = selectedCheckout;
    dueCell.value = selectedDue;
    returnedCell.value = selectedReturned;
    
});

/**
 * Send request to Update a Loan when the submit button is pressed
 * on the updateLoanForm.
 */
let updateLoanForm = document.getElementById('updateLoanForm');

updateLoanForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Form inputs
    let inputID = document.getElementById('update-id');
    let inputMaterialID = document.getElementById('update-materialID');
    let inputPatronID = document.getElementById('update-patronID');
    let inputEmployeeID = document.getElementById('update-employeeID');
    let inputCheckout = document.getElementById('update-checkout');
    let inputDue = document.getElementById('update-due');
    let inputReturned = document.getElementById('update-returned');
    
    // Input values
    let inputIDValue = inputID.value;
    let materialValue = inputMaterialID.value;
    let patronValue = inputPatronID.value;
    let employeeValue = inputEmployeeID.value;
    let checkoutValue = inputCheckout.value;
    let dueValue = inputDue.value;
    let returnedValue = inputReturned.value;
    
    // Create object
    let data = {
        id : inputIDValue,
        materialID: materialValue,
        patronID: patronValue,
        employeeID: employeeValue,
        checkout: checkoutValue,
        due: dueValue,
        returned: returnedValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/loans/${inputIDValue}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell ajax request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update existing row in table
            updateTableRow(xhttp.response);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request and wait for response
    xhttp.send(JSON.stringify(data));
})

/**
 * Take response data from an Update Loan request.
 * Update the data in the corresponding row in the table being displayed.
 */
updateTableRow = (data) => {
    
    let updatedRow = JSON.parse(data)[0];               // Get updated results from db
    
    console.log(updatedRow.loanID);

    idCell = document.getElementById(`${updatedRow.loanID}ID`);
    materialCell = document.getElementById(`${updatedRow.loanID}materialID`);
    patronCell = document.getElementById(`${updatedRow.loanID}patronID`);
    employeeCell = document.getElementById(`${updatedRow.loanID}employeeID`);
    checkoutCell = document.getElementById(`${updatedRow.loanID}checkout`);
    dueCell = document.getElementById(`${updatedRow.loanID}due`);
    returnedCell = document.getElementById(`${updatedRow.loanID}returned`);

    // Fill cells with data
    idCell.innerText = updatedRow.loanID;
    materialCell.innerText = updatedRow.materialID;
    patronCell.innerText = updatedRow.patronID;
    employeeCell.innerText = updatedRow.employeeID;
    checkoutCell.innerText = toLocalDate(updatedRow.checkout);
    dueCell.innerText = toLocalDate(updatedRow.due);
    returnedCell.innerText = toLocalDate(updatedRow.returned);
}


/**
 * Send an Add Loan request when the submit button is pressed
 * on the addLoanForm.
 */
let addLoanForm = document.getElementById('addLoanForm');

addLoanForm.addEventListener("submit", function(e) {

    // Prevent the submission and refreshing of the page
    e.preventDefault();

    // Form inputs
    let inputMaterial = document.getElementById("addMaterial");
    let inputPatron = document.getElementById("addPatron");
    let inputEmployee = document.getElementById("addEmployee");
    let inputCheckout = document.getElementById("addCheckout");
    let inputDue = document.getElementById("addDue");

    // Input values
    let materialValue = inputMaterial.value;
    let patronValue = inputPatron.value;
    let employeeValue = inputEmployee.value;
    let checkoutValue = inputCheckout.value;
    let dueValue = inputDue.value;

    // Create object
    let data = {
        materialID: materialValue,
        patronID: patronValue,
        employeeID: employeeValue,
        checkout: checkoutValue,
        due: dueValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/loans", true);
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


/**
 * Take response data from an Add Loan request.
 * Add the new Loan's data as a new row on the table being displayed.
 */
addRowToTable = (data) => {
    
    let currentTable = document.getElementById("loansTableBody");   // Get the current table body
    let parsedData = JSON.parse(data);                              
    let newRow = parsedData[parsedData.length - 1];                 // Gets the last row of the current dataset
    
    // Create a row with six cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let materialCell = document.createElement("td");
    let patronCell = document.createElement("td");
    let employeeCell = document.createElement("td");
    let checkoutCell = document.createElement("td");
    let dueCell = document.createElement("td");
    let returnedCell = document.createElement("td");

    row.id = newRow.holdID;

    // Fill cells with data
    idCell.innerText = newRow.loanID;
    materialCell.innerText = newRow.materialID;
    patronCell.innerText = newRow.patronID
    employeeCell.innerText = newRow.employeeID;
    checkoutCell.innerText = toLocalDate(newRow.checkout);
    dueCell.innerText = toLocalDate(newRow.due);
    returnedCell.innerText = "";
    
    // Add the cells to the row in the DOM
    row.appendChild(idCell);
    row.appendChild(materialCell);
    row.appendChild(patronCell);
    row.appendChild(employeeCell);
    row.appendChild(checkoutCell);
    row.appendChild(dueCell);
    row.appendChild(returnedCell);

    // Add row to table in DOM
    currentTable.appendChild(row);
}

