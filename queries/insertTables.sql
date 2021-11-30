-- INSERT syntax for Employees
INSERT INTO employees (fName, lName, position, startDate)
VALUES ("Minerva", "McGonagall", "head librarian", "1900-08-23"),
("Granger", "Hermione", "assistant librarian", "1990-01-18"),
("John", "Childermass", "clerk", "1813-02-16"),
("John", "Segundus", "clerk", "1814-07-19"),
("Karli", "Villegas", "custodian", "1944-12-26"),
("Danielle", "Osborn", "clerk", "1962-09-17"),
("Adelyn", "Woodward", "assistant librarian", "1967-04-27"),
("Adonis", "Casey", "technician", "1977-07-31"),
("Antony", "Rasmussen", "technician", "1990-12-06"),
("Bruce", "Case", "accountant", "1986-10-23")
;

-- INSERT syntax for Patrons
INSERT INTO patrons (fName, lName, birthDate, flagged)
VALUES ("Jonathan", "Strange", "1779-01-08", 0),
    ("Gilbert", "Norrell", "1750-03-15", 1),
    ("John", "Uskglass", "1450-07-03", 0),
    ("Christopher", "Drawlight", "1760-10-30", 0),
    ("Brenden", "Cohen", "1944-02-24", 0),
    ("Tess", "Deleon", "1954-04-24", 0),
    ("Sloane", "Patrick", "1956-02-07", 1),
    ("Alden", "Weber", "1972-12-03", 0),
    ("Francis", "Garza", "1985-07-29", 0),
    ("Arjun", "Dorsey", "1988-07-31", 0)
;
-- INSERT syntax for Materials
INSERT INTO materials (author, title, medium, genre, 
            restricted, availableCopies, totalCopies)
VALUES ("Terry Pratchet", "The Light Fantastic", "book", "fantasy", 0, 12, 12),
("J. R. R. Tolkien", "The Silmarillion", "book", "fantasy", 1, 1, 1),
("Brandon Sanderson", "The Way of Kings", "movie", "science fiction", 0, 0, 0),
("The Beatles", "Abbey Road", "CD", "classic rock", 0, 3, 2),
("Leo Tolstoy", "Anna Karenina", "book", "realism", 0, 0, 5),
("Gustave Flaubert", "Madame Bovary", "book", "romance", 0, 3, 5),
("Frank Darabont", "The ShawShank Redemption", "DVD", "drama", 1, 2, 2),
("Quentin Tarantino", "Pulp Fiction", "DVD", "comedy", 1, 2, 3),
("Marvin Gaye", "What's Going On", "CD", "R&B", 0, 4, 4),
("The Beach Boys", "Pet Sounds", "CD", "Rock", 0, 3, 3)
;

-- INSERT syntax for Holds
INSERT INTO holds (created, materialID, patronID, employeeID)
VALUES ("2021-11-08 09:08:00", 1, 1, NULL),
    ("2021-11-06 07:17:00", 2, 2, 3),
    ("2021-11-05 02:00:24", 3, 3, 4),
    ("2021-11-04 07:00:01", 4, 4, NULL),
    ("2021-11-29 05:04:23", 6, 1, 3),
    ("2021-11-30 09:29:30", 6, 2, 4),
    ("2021-11-28 15:34:12", 5, 5, NULL),
    ("2021-11-18 17:27:55", 5, 9, NULL),
    ("2021-11-20 18:34:19", 7, 7, NULL),
    ("2021-11-23 11:55:34", 7, 10, 7)
;

-- INSERT syntax for Loans
INSERT INTO loans (materialID, patronID, employeeID, checkout, due, returned)
VALUES (1, 2, NULL, '2021-11-01', '2021-11-28', '2021-11-04'),
    (2, 3, 3, '2021-11-02', '2021-11-28', NULL),
    (3, 4, 4, '2021-11-03', '2021-11-14', '2021-11-07'),
    (4, 1, NULL, '2021-11-04', '2021-11-07', NULL),
    (1, 3, NULL, '2021-11-18', '2021-11-30', '2021-11-21'),
    (7, 7, 7, '2021-11-30', '2021-12-14', NULL),
    (1, 5, NULL, '2021-11-30', '2021-12-14', NULL),
    (1, 6, NULL, '2021-11-30', '2021-12-14', NULL),
    (5, 9, 2, '2021-12-01', '2021-12-15', NULL),
    (10, 10, NULL, '2021-12-03', '2021-12-17', NULL)
;
