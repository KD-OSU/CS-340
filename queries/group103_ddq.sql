-- MariaDB dump 10.19  Distrib 10.4.20-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_toddjus
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) NOT NULL DEFAULT '',
  `lName` varchar(255) DEFAULT '',
  `startDate` date DEFAULT NULL,
  `position` varchar(255) DEFAULT '',
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Minerva','McGonagall','1900-08-23','head librarian'),(2,'Granger','Hermione','1990-01-18','assistant librarian'),(3,'John','Childermass','1813-02-16','clerk'),(4,'John','Segundus','1814-07-19','clerk');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holds`
--

DROP TABLE IF EXISTS `holds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holds` (
  `holdID` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `materialID` int(11) NOT NULL,
  `patronID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`holdID`),
  KEY `holdPatrons` (`patronID`),
  KEY `holdEmployees` (`employeeID`),
  KEY `holdMaterials` (`materialID`),
  CONSTRAINT `holdEmployees` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `holdMaterials` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `holdPatrons` FOREIGN KEY (`patronID`) REFERENCES `patrons` (`patronID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holds`
--

LOCK TABLES `holds` WRITE;
/*!40000 ALTER TABLE `holds` DISABLE KEYS */;
INSERT INTO `holds` VALUES (1,'2021-11-08 09:08:00',1,1,NULL),(2,'2021-11-06 07:17:00',2,2,3),(3,'2021-11-05 02:00:24',3,3,4),(4,'2021-11-04 07:00:01',4,4,NULL);
/*!40000 ALTER TABLE `holds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loans` (
  `loanID` int(11) NOT NULL AUTO_INCREMENT,
  `materialID` int(11) NOT NULL,
  `patronID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `checkout` date NOT NULL,
  `due` date NOT NULL,
  `returned` date DEFAULT NULL,
  PRIMARY KEY (`loanID`),
  KEY `loanEmployees` (`employeeID`),
  KEY `loanPatrons` (`patronID`),
  KEY `loanMaterials` (`materialID`),
  CONSTRAINT `loanEmployees` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `loanMaterials` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `loanPatrons` FOREIGN KEY (`patronID`) REFERENCES `patrons` (`patronID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` VALUES (1,1,2,NULL,'2021-11-00','2021-11-28','2021-11-04'),(2,2,3,3,'2021-11-00','2021-11-28',NULL),(3,3,4,4,'2021-11-00','2021-11-14',NULL),(4,4,1,NULL,'2021-11-00','2021-11-07',NULL);
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'Terry Pratchet','The Light Fantastic','book',0,12,12,'fantasy'),(2,'J. R. R. Tolkien','The Silmarillion','book',1,1,1,'fantasy'),(3,'Brandon Sanderson','The Way of Kings','movie',0,0,0,'science fiction'),(4,'The Beatles','Abbey Road','CD',0,3,2,'classic rock');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patrons`
--

DROP TABLE IF EXISTS `patrons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patrons` (
  `patronID` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) NOT NULL DEFAULT '',
  `lName` varchar(255) DEFAULT '',
  `birthDate` date NOT NULL,
  `flagged` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`patronID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patrons`
--

LOCK TABLES `patrons` WRITE;
/*!40000 ALTER TABLE `patrons` DISABLE KEYS */;
INSERT INTO `patrons` VALUES (1,'Jonathan','Strange','1779-01-08',0),(2,'Gilbert','Norrell','1750-03-15',0),(3,'John','Uskglass','1450-07-03',0),(4,'Christopher','Drawlight','1760-10-30',1);
/*!40000 ALTER TABLE `patrons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-08 13:58:52
