// App.js

// AllCaps Library Database Management

/*
    SETUP
*/
var express = require('express');                       // Bring express in to the app
var exphbs = require('express-handlebars');             // Import express-handlebars

var app     = express();                                // Instantiante express 
app.use(express.json())                                 // Use JSON to pass data between client an dserver
app.use(express.urlencoded({extended: true}))   
app.engine('.hbs', exphbs({                             // Create an instance of the handlebars engine to process templates
    extname: ".hbs"
}));
app.set('view engine', '.hbs'); 
var db = require('./database/db-connector')             // Bring in the db credentials and pool generator

PORT        = 1875;                                     // Port number for the app

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/


// HOME PAGE
app.get('/', function(req, res)
    {
        res.render('index');
    }
);

/* ----- PATRONS ----- */

// Display default load of patrons
app.get('/patrons', function(req, res)
    {   
        let query1;
        // If there is no search term
        if (req.query.name === undefined)
        {
            query1 = "SELECT patronID, fName, lName, DATE_FORMAT(birthDate, \"%m/%d/%Y\") as birthDate, flagged FROM patrons;";
        }
        // If there is a search term
        else
        {
            query1 = `
            SELECT patronID, fName, lName, DATE_FORMAT(birthDate, \"%m/%d/%Y\") as birthDate, flagged
            FROM patrons\
            WHERE fName LIKE '%${req.query.name}%' OR lName LIKE '%${req.query.name}%'
            `;
        }
        
        db.pool.query(query1, function(error, rows, fields){
            // Save query results
            let patrons = rows;
            res.render('patrons', {data: patrons});
        })
    }
);

// Create a new patron
app.post('/patrons', function(req, res)
    {
        let data = req.body;                        // Capture incoming data for manipulation
        let lName = data.lName;                     // Handle null for last name
        if (lName == '')
        {
            data.lName = 'NULL';
        }

        // Generate query for sending to db

        query1 = `INSERT INTO patrons (fname, lname, birthDate, flagged) VALUES ('${data.fName}', '${data.lName}', '${data.birthDate}', 0)`;
        db.pool.query(query1, function(error, rows, fields){
            if (error)
            {
                console.log(error);
                res.send(400);
            }
            else
            {
                query2 = `SELECT * from patrons;`;
                db.pool.query(query2, function(error, rows, fields){
                    if (error)
                    {
                        console.log(error);
                        res.send(400);
                    }
                    else
                    {   
                        res.send(rows);
                    }
                })
            }
        });
    }
);

// Update an existing patron
app.put('/patrons/:id', function(req, res){

    // Get the existing patron information to use in order to avoid overwriting data with empty strings
    var query1 = "SELECT * FROM patrons WHERE patronID=?";
    var query1Inserts = [req.params.id];
    query1 = db.pool.query(query1, query1Inserts, function(error, results, fields){
        if (error) {
            console.log(error)
            res.writeContinue(JSON.stringify(error));
            res.end();
        } else {

            // If any parameter from the request is an empty string, do not overwrite the existing value
            var results = results[0]
            req.body.fName = (req.body.fName === '') ? results.fName : req.body.fName;
            req.body.lName = (req.body.lName === '') ? results.lName : req.body.lName;
            req.body.birthDate = (req.body.birthDate === '') ? results.birthDate : req.body.birthDate;

            // Flagged is a checkbox and so cannot come through as an empty string
            req.body.flagged = (req.body.flagged == results.flagged) ? results.flagged : req.body.flagged;

            // Update patrons with the new information
            var query2 = "UPDATE patrons SET fName=?, lName=?, birthDate=?, flagged=? WHERE patronID=?";
            var query2Inserts = [req.body.fName, req.body.lName, req.body.birthDate, req.body.flagged, req.params.id];
            query2 = db.pool.query(query2, query2Inserts, function(error, results, fields){
                if (error) {
                    console.log(error);
                    res.write(JSON.stringify(error));
                    res.end();
                } else {

                    // Send back the information about this patron for displaying the new data in the row
                    query3 = "SELECT * FROM patrons WHERE patronID = ?"
                    query3Inserts = [req.params.id];
                    query3 = db.pool.query(query3, query3Inserts, function(error, rows, fields){
                        if (error)
                        {
                            console.log(error);
                            res.send(400);
                        }
                        else
                        {
                            res.status(200);
                            res.send(rows);
                        }
                    })
                }
            })
        }
    });
});





/* ----- EMPLOYEES ----- */
app.get('/employees', function(req, res)
    {
        let query1 = "SELECT employeeID, fName, lName, DATE_FORMAT(startDate, \"%m/%d/%Y\") as startDate, position FROM employees;";
        db.pool.query(query1, function(error, rows, fields){
            // Save query results
            let employees = rows;
            res.render('employees', {data: employees});
        })
    }
);

app.post('/employees', function(req, res)
    {
        let data = req.body;
        let lName = data.lName;                     // Handle null for last name
        if (lName == '')
        {
            data.lName = 'NULL';
        }

        let position = data.position;                     // Handle null for position
        if (position == '')
        {
            data.position = 'NULL';
        }

        let startDate = data.startDate;                     // Handle null for last name
        if (startDate == '')
        {
            data.startDate = 'NULL';
        }

        // Generate query for sending to db

        query1 = `INSERT INTO employees (fname, lname, startDate, position) VALUES ('${data.fName}', '${data.lName}', '${data.startDate}', '${data.position}')`;
        db.pool.query(query1, function(error, rows, fields){
            if (error)
            {
                console.log(error);
                res.send(400);
            }
            else
            {
                query2 = `SELECT * from employees;`;
                db.pool.query(query2, function(error, rows, fields){
                    if (error)
                    {
                        console.log(error);
                        res.send(400);
                    }
                    else
                    {   
                        res.send(rows);
                    }
                })
            }
        });
    }   
);

/* ----- MATERIALS ----- */
app.get('/materials', function(req, res)
    {
        let query1 = "SELECT * FROM materials;";
        db.pool.query(query1, function(error, rows, fields){
            // Save query results
            let materials = rows;
            res.render('materials', {data: materials});
        })
    }
);

// Create a new material
app.post('/materials', function(req, res)
    {
        let data = req.body;                                  // Capture incoming data for manipulation
        let employeeID = data.employeeID;                     // Handle null for employee name
        if (employeeID == '')
        {
            data.employeeID = 'NULL';
        }
        // Generate query for sending to db
        query1 = `INSERT INTO materials (author, title, medium, genre, restricted, availableCopies, totalCopies) 
                  VALUES ('${data.author}', '${data.title}', '${data.medium}', '${data.genre}', ${data.restricted}, ${data.copies}, ${data.copies});`;
        db.pool.query(query1, function(error, rows, fields){
            if (error)
            {
                console.log(error);
                res.send(400);
            }
            else
            {
                query2 = `SELECT * from materials;`;
                db.pool.query(query2, function(error, rows, fields){
                    if (error)
                    {
                        console.log(error);
                        res.send(400);
                    }
                    else
                    {   
                        res.send(rows);
                    }
                })
            }
        });
    }
);

/* ----- LOANS ----- */
app.get('/loans', function(req, res)
    {
        // Queries
        let loansQuery = "SELECT loanID, materialID, patronID, employeeID, DATE_FORMAT(checkout, \"%m/%d/%Y\") as checkout, DATE_FORMAT(due, \"%m/%d/%Y\") as due, DATE_FORMAT(returned, \"%m/%d/%Y\") as returned FROM loans;";
        let materialsQuery = "SELECT * FROM materials;";
        let patronsQuery = "SELECT * FROM patrons;";
        let employeesQuery = "SELECT * FROM employees;";

        // Get all the holds, and nest the other queries sequentially this so they ALL run before we return
        // The subsequent queries populate the form dropdowns
        db.pool.query(loansQuery, function(error, rows, fields){
            let loans = rows;
            // Materials
            db.pool.query(materialsQuery, function(error, rows, fields){
                let materials = rows;
                // Patrons
                db.pool.query(patronsQuery, function(error, rows, fields){
                    let patrons = rows;
                    // Employees
                    db.pool.query(employeesQuery, function(error, rows, fields){
                        let employees = rows;
                        //console.log({data: holds, materials: materials, patrons: patrons, employees: employees})
                        return res.render('loans', {data: loans, materials: materials, patrons: patrons, employees: employees});
                    })
                })
            })
        })
    }
);

// Create a new loan
app.post('/loans', function(req, res)
    {
        let data = req.body;                                  // Capture incoming data for manipulation
        let employeeID = data.employeeID;                     // Handle null for employee name
        if (employeeID == '')
        {
            data.employeeID = 'NULL';
        }
        // Generate query for sending to db
        query1 = `INSERT INTO loans (materialID, patronID, employeeID, checkout, due) VALUES (${data.materialID}, ${data.patronID}, ${data.employeeID}, '${data.checkout}', '${data.due}')`;
        db.pool.query(query1, function(error, rows, fields){
            if (error)
            {
                console.log(error);
                res.send(400);
            }
            else
            {
                query2 = `SELECT * from loans;`;
                db.pool.query(query2, function(error, rows, fields){
                    if (error)
                    {
                        console.log(error);
                        res.send(400);
                    }
                    else
                    {   
                        res.send(rows);
                    }
                })
            }
        });
    }
);

/* ----- HOLDS ----- */

// Displays default load of holds
app.get('/holds', function(req, res)
    {   
        // Queries
        let holdsQuery = "SELECT holdID, DATE_FORMAT(created, \"%m/%d/%Y %r\") as created, materialID, patronID, employeeID FROM holds;";
        let materialsQuery = "SELECT * FROM materials;";
        let patronsQuery = "SELECT * FROM patrons;";
        let employeesQuery = "SELECT * FROM employees;";

        // Get all the holds, and nest the other queries sequentially this so they ALL run before we return
        // The subsequent queries populate the form dropdowns
        db.pool.query(holdsQuery, function(error, rows, fields){
            let holds = rows;
            // Materials
            db.pool.query(materialsQuery, function(error, rows, fields){
                let materials = rows;
                // Patrons
                db.pool.query(patronsQuery, function(error, rows, fields){
                    let patrons = rows;
                    // Employees
                    db.pool.query(employeesQuery, function(error, rows, fields){
                        let employees = rows;
                        //console.log({data: holds, materials: materials, patrons: patrons, employees: employees})
                        return res.render('holds', {data: holds, materials: materials, patrons: patrons, employees: employees});
                    })
                })
            })
        })
    }
);

// Create a new hold
app.post('/holds', function(req, res)
    {
        let data = req.body;                                  // Capture incoming data for manipulation
        let employeeID = data.employeeID;                     // Handle null for employee name
        if (employeeID == '')
        {
            data.employeeID = 'NULL';
        }
        // Generate query for sending to db
        query1 = `INSERT INTO holds (created, materialID, patronID, employeeID) VALUES (now(), ${data.materialID}, ${data.patronID}, ${data.employeeID})`;
        db.pool.query(query1, function(error, rows, fields){
            if (error)
            {
                console.log(error);
                res.send(400);
            }
            else
            {
                query2 = `SELECT * from holds;`;
                db.pool.query(query2, function(error, rows, fields){
                    if (error)
                    {
                        console.log(error);
                        res.send(400);
                    }
                    else
                    {   
                        res.send(rows);
                    }
                })
            }
        });
    }
);

app.delete('/holds/:id', function(req, res){
    var query1 = "DELETE FROM holds WHERE holdID = ?";
    var inserts = [req.params.id];
    sql = db.pool.query(query1, inserts, function(error, results, fields){
        if (error) {
            console.log(error)
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        } else {
            res.status(202).end();
        }
    })
});

// SAMPLE
app.get('/sample', function(req, res)
    {
        let query1 = "SELECT * FROM bsg_people;";
        let query2 = "SELECT * FROM bsg_planets;";

        db.pool.query(query1, function(error, rows, fields){

            // Save query results
            let people = rows;

            // Run the second query
            db.pool.query(query2, function(error, rows, fields){
                // Save the planets
                let planets = rows;
                return res.render('index', {data: people, planets: planets});
            })
        })
});

app.post('/add-person-ajax', function(req, res)
    {
        let data = req.body;         // Capture incoming data for manipulation


        // Handle nulls for homeworld and age
        let homeworld = parseInt(data.homeworld);
        if (isNaN(homeworld))
        {
            homeworld = 'NULL';
        }
        
        let age = parseInt(data.age);
        if (isNaN(age))
        {
            age = 'NULL'
        }

        // Generate query for sending to db

        query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', '${data.homeworld}', '${data.age}')`;
        db.pool.query(query1, function(error, rows, fields){
            if (error)
            {
                console.log(error);
                res.send(400);
            }
            else
            {
                query2 = `SELECT * from bsg_people;`;
                db.pool.query(query2, function(error, rows, fields){
                    if (error)
                    {
                        console.log(error);
                        res.send(400);
                    }
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });


/*
    LISTENER
*/

app.listen(PORT, function(){
    console.log('Express started on http://flip1.engr.oregonstate.edu/:' + PORT + '; press ctrl + C to terminate.')
});
