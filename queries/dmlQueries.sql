/*
 ------
 EMPLOYEES QUERIES 
 ------
 */

-- Get all employees to populate employees table
SELECT * FROM employees;

-- Add new employee
INSERT INTO employees (fName, lName, position, startDate)
VALUES (:fName, :lName, :position, :startDate);

/*
 ------
 HOLDS QUERIES 
 ------
 */
 
 -- Get all holds to populate holds table
 SELECT * FROM holds;
 
 -- Create a new hold
INSERT INTO holds (created, materialID, patronID, employeeID)
VALUES (now(), :materialID, :patronID, :employeeID);

-- Update existing hold
UPDATE holds
SET created = :created, materialID = :materialID, patronID = :patronID, employeeID = :employeeID
WHERE holdID = :holdID;

-- Delete existing hold
DELETE FROM holds where holdID = :holdID;



/*
 ------
 LOANS QUERIES 
 ------
 */

 -- Get all loans to populate loans table
 SELECT * FROM loans;
 
-- Create a new loan
INSERT INTO loans (materialID, patronID, employeeID, checkout, due, returned)
VALUES (:materialID, :patronID, :employeeID, now(), :due, NULL);

-- Update an existing loan
UPDATE loans
SET materialID = :materialID, patronID = :patronID, employeeID = :employeeID, checkout = :checkout, due = :due, returned = :returned
WHERE loanID = :loanID;


/*
 ------
 MATERIALS QUERIES 
 ------
 */
 
 -- Get all materials to populate materials table
 SELECT * FROM materials;
 
 -- Create a new material
INSERT INTO materials (author, title, medium, genre, 
            restricted, availableCopies, totalCopies)
VALUES (:author, :title, :medium, :genre, :restricted, :copies, :copies);

-- Update an existing materialID
UPDATE materials
SET author = :author, title = :title, medium = :medium, genre = :genre, restricted = :restricted, availableCopies = :availableCopies, totalCopies = :totalCopies
WHERE materialID = materialID;

/*
 ------
 PATRONS QUERIES 
 ------
 */
 
 -- Get all patrons to populate patrons table
SELECT * FROM patrons;

-- Add new patron
INSERT INTO patrons (fName, lName, birthDate, flagged)
VALUES (:fName, :lName, :birthDate, 0);

-- Update existing patron
UPDATE patrons
SET fName = :fName, lName = :lName, birthDate = :birthDate, flagged = :flagged
WHERE patronID = :patronID;

-- Search for patron
SELECT *
FROM patrons
WHERE fName like '%:fName%' OR lName like '%:lName%'
