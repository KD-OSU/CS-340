// employees.js
// Client-side javascript for manipulating the DOM and making http requests from the Employees page


/**
 * Send request to Add Employee when submit button pressed
 * on addEmployeeForm.
 */
let addPersonForm = document.getElementById('addEmployeeForm');

addPersonForm.addEventListener("submit", function(e) {

    // Prevent the submission and refreshing of the page
    e.preventDefault();

    // Form inputs
    let inputFirstName = document.getElementById("fName");
    let inputLastName = document.getElementById("lName");
    let inputPosition = document.getElementById("position");
    let inputStartDate = document.getElementById("startDate");

    // Input values
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let positionValue = inputPosition.value;
    let startDateValue = inputStartDate.value;

    // Create object
    let data = {
        fName: firstNameValue,
        lName: lastNameValue,
        position: positionValue,
        startDate: startDateValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/employees", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell ajax request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new row to table
            addRowToTable(xhttp.response);

            // Clear input fields to allow for another insert
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPosition.value = '';
            inputStartDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request and wait for response
    xhttp.send(JSON.stringify(data));
})

/**
 * Take response data from an Add Employee request.
 * Add the new Employee's data as a new row on the table being displayed.
 */
addRowToTable = (data) => {
    
    let currentTable = document.getElementById("employeesTableBody"); // Get the current table body
    let parsedData = JSON.parse(data);                              
    let newRow = parsedData[parsedData.length - 1];                 // Gets the last row of the current dataset
    

    // Create a row with five cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let firstNameCell = document.createElement("td");
    let lastNameCell = document.createElement("td");
    let startDateCell = document.createElement("td");
    let positionCell = document.createElement("td");

    // Fill cells with data
    idCell.innerText = newRow.employeeID;
    firstNameCell.innerText = newRow.fName;
    lastNameCell.innerText = newRow.lName;
    startDateCell.innerText = toLocalDate(newRow.startDate);
    positionCell.innerText = newRow.position;

    // Add the cells to the row in the DOM
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(startDateCell);
    row.appendChild(positionCell);

    // Add row to table in DOM
    currentTable.appendChild(row);
}