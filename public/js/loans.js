// loans.js

// Client-side javascript for manipulating the DOM and making http requests from the loans page


/* 

ADD ROW FUNCTIONALITY

*/

// Make a post request and add row when addHoldFrom is submitted
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


// Add row to table in front-end
// I think this can be a common js function that we can use use in all files if we create a loop to deal with the data
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

