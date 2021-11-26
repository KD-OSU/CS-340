-- INSERT syntax for Employees
INSERT INTO employees (fName, lName, position, startDate)
VALUES ("Minerva", "McGonagall", "head librarian", '1900-08-23'),
("Granger", "Hermione", "assistant librarian", '1990-01-18'),
("John", "Childermass", "clerk", '1813-02-16'),
("John", "Segundus", "clerk", '1814-07-19')
;

-- INSERT syntax for Patrons
INSERT INTO patrons (fName, lName, birthDate)
VALUES ("Jonathan", "Strange", '1779-01-08'),
    ("Gilbert", "Norrell", '1750-03-15'),
    ("John", "Uskglass", '1450-07-03'),
    ("Christopher", "Drawlight", '1760-10-30')
;
-- INSERT syntax for Materials
INSERT INTO materials (author, title, medium, genre, 
            restricted, availableCopies, totalCopies)
VALUES ("Terry Pratchet", "The Light Fantastic", "book", "fantasy", 0, 12, 12),
("J. R. R. Tolkien", "The Silmarillion", "book", "fantasy", 1, 1, 1),
("Brandon Sanderson", "The Way of Kings", "movie", "science fiction", 0, 0, 0),
("The Beatles", "Abbey Road", "CD", "classic rock", 0, 3, 2)
;

-- INSERT syntax for Holds
INSERT INTO holds (created, materialID, patronID, employeeID)
VALUES ("2021-11-08 09:08:00", 1, 1, NULL),
    ("2021-11-06 07:17:00", 2, 2, 3),
    ("2021-11-05 02:00:24", 3, 3, 4),
    ("2021-11-04 07:00:01", 4, 4, NULL)
;

-- INSERT syntax for Loans
INSERT INTO loans (materialID, patronID, employeeID, checkout, due)
VALUES (1, 2, NULL, '2021-11-01', '2021-11-28'),
    (2, 3, 3, '2021-11-02', '2021-11-28'),
    (3, 4, 4, '2021-11-03', '2021-11-14'),
    (4, 1, NULL, '2021-11-04', '2021-11-07')
;

-- Include one returned loan
UPDATE loans
    SET returned = '2021-11-04'
    WHERE loanID = 1
;

-- Include one flagged patron
UPDATE patrons
    SET flagged = 1
    WHERE patronID = 4
;
