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
        let query1 = "SELECT patronID, fName, lName, DATE_FORMAT(birthDate, \"%m/%d/%Y\") as birthDate, flagged FROM patrons;";
        db.pool.query(query1, function(error, rows, fields){
            // Save query results
            let patrons = rows;
            res.render('patrons', {data: patrons});
        })
    }
);

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

/* ----- LOANS ----- */
app.get('/loans', function(req, res)
    {
        let query1 = "SELECT * FROM loans;";
        db.pool.query(query1, function(error, rows, fields){
            // Save query results
            let loans = rows;
            res.render('loans', {data: loans});
        })
    }
);

/* ----- HOLDS ----- */
app.get('/holds', function(req, res)
    {
        let query1 = "SELECT * FROM holds;";
        db.pool.query(query1, function(error, rows, fields){
            // Save query results
            let holds = rows;
            res.render('holds', {data: holds});
        })
    }
);

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
    console.log('Express started onhttp://localhost:' + PORT + '; press ctrl + C to terminate.')
});