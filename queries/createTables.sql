-- Create syntax for Employees
CREATE TABLE `employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) NOT NULL DEFAULT '',
  `lName` varchar(255) DEFAULT '',
  `startDate` date DEFAULT NULL,
  `position` varchar(255) DEFAULT '',
  PRIMARY KEY (`employeeID`)
);

-- Create syntax for Holds
CREATE TABLE `holds` (
  `holdID` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `materialID` int(11) NOT NULL,
  `patronID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`holdID`)
);

-- Create syntax for Loans
CREATE TABLE `loans` (
  `loanID` int(11) NOT NULL AUTO_INCREMENT,
  `materialID` int(11) NOT NULL,
  `patronID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `checkout` date NOT NULL,
  `due` date NOT NULL,
  `returned` date DEFAULT NULL,
  PRIMARY KEY (`loanID`)
);

-- Create syntax for Materials
CREATE TABLE `materials` (
  `materialID` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `medium` varchar(255) NOT NULL DEFAULT '',
  `restricted` tinyint(1) DEFAULT NULL, 
  `availableCopies` int(11) DEFAULT NULL, 
  `totalCopies` int(11) DEFAULT NULL, 
  `genre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`materialID`)
);

-- Create syntax for Patrons
CREATE TABLE `patrons` (
  `patronID` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) NOT NULL DEFAULT '',
  `lName` varchar(255) DEFAULT '',
  `birthDate` date NOT NULL,
  `flagged` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`patronID`)
);

-- Adding foreign keys for Holds
ALTER TABLE `holds`
  ADD KEY `holdPatrons` (`patronID`),
  ADD KEY `holdEmployees` (`employeeID`),
  ADD KEY `holdMaterials` (`materialID`),
  ADD CONSTRAINT `holdEmployees` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `holdMaterials` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `holdPatrons` FOREIGN KEY (`patronID`) REFERENCES `patrons` (`patronID`) ON DELETE CASCADE ON UPDATE NO ACTION
;

-- Adding foreign keys for Loans
ALTER TABLE `loans` 
  ADD KEY `loanEmployees` (`employeeID`),
  ADD KEY `loanPatrons` (`patronID`),
  ADD KEY `loanMaterials` (`materialID`),
  ADD CONSTRAINT `loanEmployees` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `loanMaterials` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `loanPatrons` FOREIGN KEY (`patronID`) REFERENCES `patrons` (`patronID`) ON DELETE CASCADE ON UPDATE NO ACTION
;
