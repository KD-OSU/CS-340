// holds.js
// Client-side javascript for manipulating the DOM and making http requests from the holds page


/**
 * Pre-populate the updateHoldForm when a holdID is selected
 * from the drop-down menu.
 */ 
let holdSelector =document.getElementById('update-id');

holdSelector.addEventListener('change', function(){
    selectedID = holdSelector.value;
    
    // get the existing data from relevant table cells 
    selectedMaterialID = document.getElementById(`${selectedID}materialID`).innerText;
    selectedPatronID = document.getElementById(`${selectedID}patronID`).innerText;
    selectedEmployeeID = document.getElementById(`${selectedID}employeeID`).innerText;
    selectedCreated = toDateTimeFormat(document.getElementById(`${selectedID}created`).innerText);

    // get the form inputs
    materialCell = document.getElementById('update-materialID');
    patronCell = document.getElementById('update-patronID');
    employeeCell = document.getElementById('update-employeeID');
    createdCell = document.getElementById('update-created');
    
    // pre-populate the form with existing data
    materialCell.value = selectedMaterialID;
    patronCell.value = selectedPatronID;
    employeeCell.value = selectedEmployeeID;
    createdCell.value = selectedCreated;
    
});


/**
 * Send request to Update a Hold when the submit button is pressed
 * on the updateHoldForm.
 */
let updateHoldForm = document.getElementById('updateHoldForm');

updateHoldForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Form inputs
    let inputID = document.getElementById('update-id');
    let inputMaterialID = document.getElementById('update-materialID');
    let inputPatronID = document.getElementById('update-patronID');
    let inputEmployeeID = document.getElementById('update-employeeID');
    let inputCreated = document.getElementById('update-created');
    
    // Input values
    let inputIDValue = inputID.value;
    let materialValue = inputMaterialID.value;
    let patronValue = inputPatronID.value;
    let employeeValue = inputEmployeeID.value;
    let createdValue = inputCreated.value;
    
    // Create object
    let data = {
        id : inputIDValue,
        materialID: materialValue,
        patronID: patronValue,
        employeeID: employeeValue,
        created: createdValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/holds/${inputIDValue}`, true);
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
 * Take response data from an Update Hold request.
 * Update the data in the corresponding row in the table being displayed.
 */
updateTableRow = (data) => {
    
    let updatedRow = JSON.parse(data)[0];               // Get updated results from db

    idCell = document.getElementById(`${updatedRow.holdID}ID`);
    materialCell = document.getElementById(`${updatedRow.holdID}materialID`);
    patronCell = document.getElementById(`${updatedRow.holdID}patronID`);
    employeeCell = document.getElementById(`${updatedRow.holdID}employeeID`);
    createdCell = document.getElementById(`${updatedRow.holdID}created`);
    
    // Fill cells with data
    idCell.innerText = updatedRow.holdID;
    materialCell.innerText = updatedRow.materialID;
    patronCell.innerText = updatedRow.patronID;
    employeeCell.innerText = updatedRow.employeeID;
    createdCell.innerText = toLocalDateTime(updatedRow.created);
}


/**
 * Send an Add Hold request when the submit button is pressed
 * on the addHoldForm.
 */
let addHoldForm = document.getElementById('addHoldForm');

addHoldForm.addEventListener("submit", function(e) {

    // Prevent the submission and refreshing of the page
    e.preventDefault();

    // Form inputs
    let inputMaterial = document.getElementById("addMaterialID");
    let inputPatron = document.getElementById("addPatronID");
    let inputEmployee = document.getElementById("addEmployeeID");

    // Input values
    let materialValue = inputMaterial.value;
    let patronValue = inputPatron.value;
    let employeeValue = inputEmployee.value;

    // Create object
    let data = {
        materialID: materialValue,
        patronID: patronValue,
        employeeID: employeeValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/holds", true);
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
 * Take response data from an Add Hold request.
 * Add the new Hold's data as a new row on the table being displayed.
 */
addRowToTable = (data) => {
    
    let currentTable = document.getElementById("holdsTableBody");   // Get the current table body
    let parsedData = JSON.parse(data);                              
    let newRow = parsedData[parsedData.length - 1];                 // Gets the last row of the current dataset
    
    // Create a row with six cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let createdCell = document.createElement("td");
    let materialCell = document.createElement("td");
    let patronCell = document.createElement("td");
    let employeeCell = document.createElement("td");
    let deleteCell = document.createElement("td");
    
    row.id = newRow.holdID;

    // Create delete button for row
    let deleteButton = document.createElement("button");
    deleteButton.type="button";
    deleteButton.className = "btn btn-outline-danger";
    deleteButton.setAttribute("deleteId", newRow.holdID);
    deleteButton.innerText = "Delete";
    bindDeleteButton(deleteButton);  // bind 'delete' functionality to new button

    // Fill cells with data
    idCell.innerText = newRow.holdID;
    createdCell.innerText = toLocalDateTime(newRow.created);
    materialCell.innerText = newRow.materialID;
    patronCell.innerText = newRow.patronID
    employeeCell.innerText = newRow.employeeID;
    deleteCell.className = "delete";
    deleteCell.appendChild(deleteButton);

    
    // Add the cells to the row in the DOM
    row.appendChild(idCell);
    row.appendChild(createdCell);
    row.appendChild(materialCell);
    row.appendChild(patronCell);
    row.appendChild(employeeCell);
    row.appendChild(deleteCell);

    // Add row to table in DOM
    currentTable.appendChild(row);
}


/**
 * Send a Delete Hold request when the Delete button is pressed
 * in a Hold's row on the table.
 * Binds the 'delete' functionality to all Delete buttons on the table.
 */
document.addEventListener("DOMContentLoaded", bindDeletes);

function bindDeleteButton(deleteButton){
    // Bind the delete button after a new row is added or the DOM is reloaded
    deleteButton.addEventListener("click", function(){
        var deleteId = deleteButton.getAttribute("deleteId");
        var req = new XMLHttpRequest();
        var payload = {}
        payload.id = deleteId
        req.open('DELETE', `/holds/${deleteId}`, true)
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                deleteRow(deleteId)
            } else {
              console.log("Error in network request: " + req.statusText);
            }});
        req.send(JSON.stringify(payload));
    })
}

function bindDeletes() {
    document.querySelectorAll('.btn-outline-danger').forEach(item => {
    // Add event listener to make DELETE request on specific ID
        bindDeleteButton(item)
});
}


/**
 * Take the deleteId for a row on the Hold table.
 * Remove that row from the table being displayed.
 */
function deleteRow(deleteId) {
    let row = document.getElementById(deleteId)
    row.parentNode.removeChild(row);
}

