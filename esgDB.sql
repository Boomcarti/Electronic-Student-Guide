-- MariaDB dump 10.19  Distrib 10.9.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: esgDB
-- ------------------------------------------------------
-- Server version	10.9.2-MariaDB

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
-- Table structure for table `tblBudgets`
--

DROP TABLE IF EXISTS `tblBudgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblBudgets` (
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budgetName` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `bloat` float DEFAULT NULL,
  `actual` float DEFAULT NULL,
  `unlocked` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`username`,`budgetName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblBudgets`
--

LOCK TABLES `tblBudgets` WRITE;
/*!40000 ALTER TABLE `tblBudgets` DISABLE KEYS */;
INSERT INTO `tblBudgets` VALUES
('VRWSHA002','Cash',500,200,350,0),
('VRWSHA002','Electricity',500,200,400,0),
('VRWSHA002','Food',100,150,80,1),
('VRWSHA002','Savings',100,150,50,1),

('DTTFRA013','Water',500,200,0,0),
('DTTFRA013','Electricity',500,200,0,0),
('DTTFRA013','Snacks',100,150,0,1),
('DTTFRA013','Clothes',100,150,0,1);
/*!40000 ALTER TABLE `tblBudgets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblBudgetsAnalytics`
--

DROP TABLE IF EXISTS `tblBudgetsAnalytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblBudgetsAnalytics` (
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budgetDate` date NOT NULL,
  `amount` float NOT NULL,
  `budget` float NOT NULL,
  PRIMARY KEY (`username`,`budgetDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblBudgetsAnalytics`
--

LOCK TABLES `tblBudgetsAnalytics` WRITE;
/*!40000 ALTER TABLE `tblBudgetsAnalytics` DISABLE KEYS */;
INSERT INTO `tblBudgetsAnalytics` VALUES

('VRWSHA002','2022-09-02',150,2000),
('VRWSHA002','2022-09-03',300,2000),
('VRWSHA002','2022-09-05',200,2000),
('VRWSHA002','2022-09-07',50,2000),
('VRWSHA002','2022-09-09',100,2100),
('VRWSHA002','2022-09-10',90,2100),
('VRWSHA002','2022-09-12',210,2100),
('VRWSHA002','2022-09-14',630,2100),
('VRWSHA002','2022-09-15',100,2300),
('VRWSHA002','2022-09-17',300,2300),
('VRWSHA002','2022-09-18',50,2300),
('VRWSHA002','2022-09-20',40,2300),
('VRWSHA002','2022-09-22',40,2400),
('VRWSHA002','2022-09-25',100,2500),
('VRWSHA002','2022-09-26',300,2800),
('VRWSHA002','2022-09-27',50,2900),


('DTTFRA013','2022-09-02',150,3000),
('DTTFRA013','2022-09-03',600,3000),
('DTTFRA013','2022-09-05',500,3000),
('DTTFRA013','2022-09-07',250,3000),
('DTTFRA013','2022-09-09',130,3100),
('DTTFRA013','2022-09-10',190,3100),
('DTTFRA013','2022-09-12',220,3100),
('DTTFRA013','2022-09-14',630,3500),
('DTTFRA013','2022-09-15',140,3500),
('DTTFRA013','2022-09-17',320,3500),
('DTTFRA013','2022-09-18',250,3600),
('DTTFRA013','2022-09-20',340,3600),
('DTTFRA013','2022-09-22',440,3600),
('DTTFRA013','2022-09-25',100,3600),
('DTTFRA013','2022-09-26',300,3600),
('DTTFRA013','2022-09-27',250,3600);


/*!40000 ALTER TABLE `tblBudgetsAnalytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCards`
--

DROP TABLE IF EXISTS `tblCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCards` (
  `id` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Turbulent` tinyint(4) DEFAULT 0,
  `High` tinyint(4) DEFAULT 0,
  `Universal` tinyint(4) DEFAULT 0,
  `Section` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NON',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCards`
--

LOCK TABLES `tblCards` WRITE;
/*!40000 ALTER TABLE `tblCards` DISABLE KEYS */;
INSERT INTO `tblCards` VALUES
('000','Dynamically Generated Card',0,0,0,'NON'),
('001','Budgeting',0,0,1,'FIN'),
('002','Currency Advice',0,0,1,'FIN'),
('003','Discounts',0,0,1,'FIN'),
('004','Fees',0,0,1,'FIN'),
('005','Financial Advisors',0,0,1,'FIN'),
('006','Fraud Detection',0,0,1,'FIN'),
('007','Savings',0,0,1,'FIN'),
('008','Scholarships',0,0,1,'FIN'),
('009','Funding',0,0,1,'FIN'),
('010','Internships',0,0,1,'STD'),
('011','Investment',0,1,0,'FIN'),
('012','Bursaries With Work Back',1,0,0,'FIN'),
('013','Interview Help',0,0,1,'FIN'),
('014','Career Day',0,1,0,'FIN'),
('015','Government Grants',0,0,1,'FIN'),
('016','Managing Money at School',0,0,1,'FIN'),
('017','Student Funding Postgraduate',0,0,1,'FIN'),
('018','Financial Planning',1,0,0,'FIN'),
('019','Student Loans',0,0,0,'FIN'),
('020','Stress',1,0,0,'WEL'),
('021','Managing Stress',0,0,0,'WEL'),
('022','Managing Anxiety',0,0,0,'WEL'),
('023','Food and Health',0,0,1,'WEL'),
('024','Calorie Tracking',1,0,0,'WEL'),
('025','Meal Planning',0,1,0,'WEL'),
('026','Dieting',0,0,1,'WEL'),
('027','How to Stick to your Diet',0,0,0,'WEL'),
('028','Exercise',0,0,1,'WEL'),
('029','Workout Planners and Trackers',0,1,0,'WEL'),
('031','Depression and Symptoms',0,0,1,'WEL'),
('032','Student Wellness',0,0,1,'WEL'),
('033','Feeling Tired and Overwelmed',0,0,0,'WEL'),
('034','Eating Disorders',1,0,0,'WEL'),
('035','Drugs and Medication',1,0,0,'WEL'),
('036','Substance Misuse',0,0,0,'WEL'),
('037','The Importance of Sleep',1,0,0,'WEL'),
('038','Improving Sleep',0,0,0,'WEL'),
('039','School Sports',0,1,0,'WEL'),
('040','Kindness and Empathy',0,1,0,'WEL'),
('041','Anxiety',0,0,1,'WEL'),
('042','Workload Management',0,0,0,'STD'),
('043','Procrastination Reduction',0,0,0,'STD'),
('044','Getting a Tutor',0,0,0,'STD'),
('045','Workspace Organisation',0,0,1,'STD'),
('046','Time Management',0,0,1,'STD'),
('047','Exam Practice',0,0,1,'STD'),
('048','Enrichment',0,1,0,'STD'),
('049','Becoming a Tutor',0,1,0,'STD'),
('050','Improving Consistency',1,0,0,'STD'),
('051','Balancing Workload',1,0,0,'STD'),
('052','Accountability Partners',1,0,0,'STD'),
('053','Taking Regular Breaks',1,0,0,'STD');
/*!40000 ALTER TABLE `tblCards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblMoods`
--

DROP TABLE IF EXISTS `tblMoods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblMoods` (
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moodDate` datetime NOT NULL,
  `mood` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`moodDate`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblMoods`
--

LOCK TABLES `tblMoods` WRITE;
/*!40000 ALTER TABLE `tblMoods` DISABLE KEYS */;
INSERT INTO `tblMoods` VALUES
('VRWSHA002','2022-09-28 11:12:32',1),
('VRWSHA002','2022-09-28 10:14:12',0),
('VRWSHA002','2022-09-28 12:43:21',4),
('VRWSHA002','2022-09-28 13:14:32',1),
('VRWSHA002','2022-09-28 14:15:12',2),
('VRWSHA002','2022-09-27 15:42:21',1),
('VRWSHA002','2022-09-27 13:12:32',3),
('VRWSHA002','2022-09-27 14:14:12',4),
('VRWSHA002','2022-09-27 15:43:21',4),
('VRWSHA002','2022-09-26 11:12:32',3),
('VRWSHA002','2022-09-26 10:14:12',2),
('VRWSHA002','2022-09-26 12:43:21',3),
('VRWSHA002','2022-09-26 13:14:32',0),
('VRWSHA002','2022-09-25 14:15:12',3),
('VRWSHA002','2022-09-25 15:42:21',1),
('VRWSHA002','2022-09-25 13:12:32',1),
('VRWSHA002','2022-09-25 14:14:12',2),
('VRWSHA002','2022-09-25 15:43:21',4),

('DTTFRA013','2022-09-28 09:12:32',3),
('DTTFRA013','2022-09-28 10:14:12',3),
('DTTFRA013','2022-09-28 16:43:21',4),
('DTTFRA013','2022-09-28 13:14:32',2),
('DTTFRA013','2022-09-28 14:15:12',3),
('DTTFRA013','2022-09-27 19:42:21',2),
('DTTFRA013','2022-09-27 13:12:32',2),
('DTTFRA013','2022-09-27 20:14:12',3),
('DTTFRA013','2022-09-27 15:43:21',4),
('DTTFRA013','2022-09-26 12:12:32',2),
('DTTFRA013','2022-09-26 10:14:12',3),
('DTTFRA013','2022-09-26 12:43:21',4),
('DTTFRA013','2022-09-26 15:14:32',3),
('DTTFRA013','2022-09-25 14:15:12',2),
('DTTFRA013','2022-09-25 17:42:21',3),
('DTTFRA013','2022-09-25 13:12:32',2),
('DTTFRA013','2022-09-25 09:14:12',3),
('DTTFRA013','2022-09-25 15:43:21',4);

/*!40000 ALTER TABLE `tblMoods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblTodo`
--

DROP TABLE IF EXISTS `tblTodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblTodo` (
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `todoName` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateExpired` datetime DEFAULT NULL,
  `dateCompleted` datetime DEFAULT NULL,
  `complete` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`username`,`todoName`,`dateCreated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblTodo`
--

LOCK TABLES `tblTodo` WRITE;
/*!40000 ALTER TABLE `tblTodo` DISABLE KEYS */;
INSERT INTO `tblTodo` VALUES
('VRWSHA002','Assignment 5','2022-06-05 00:00:00','2022-06-07 00:00:00','2022-06-06 00:00:00',1),
('VRWSHA002','Buy Clothes','2022-06-05 00:00:00','2022-06-09 00:00:00','2022-06-07 00:00:00',1),
('VRWSHA002','Buy Groceries','2022-06-05 00:00:00','2022-06-09 00:00:00','2022-06-07 00:00:00',0),
('VRWSHA002','Clean Dishes','2022-06-05 00:00:00','2022-06-05 00:00:00','2022-06-05 00:00:00',0),
('VRWSHA002','Cook Food','2022-06-05 00:00:00','2022-06-05 00:00:00','2022-06-05 00:00:00',1),
('VRWSHA002','Study','2022-06-05 00:00:00','2022-06-05 00:00:00','2022-06-05 00:00:00',1),
('VRWSHA002','Study Test2','2022-06-05 00:00:00','2022-06-07 00:00:00','2022-06-06 00:00:00',1),
('VRWSHA002','Sweep Floors','2022-06-05 00:00:00','2022-06-09 00:00:00','2022-06-07 00:00:00',0),
('VRWSHA002','Tutorial 3','2022-06-05 00:00:00','2022-06-07 00:00:00','2022-06-06 00:00:00',0),

('DTTFRA013','Assignment 6','2022-06-05 00:00:00','2022-06-07 00:00:00','2022-06-06 00:00:00',0),
('DTTFRA013','Buy Clothes ','2022-06-05 00:00:00','2022-06-09 00:00:00','2022-06-07 00:00:00',0),
('DTTFRA013','Buy Groceries','2022-06-05 00:00:00','2022-06-09 00:00:00','2022-06-07 00:00:00',0),
('DTTFRA013','Clean Dishes','2022-06-05 00:00:00','2022-06-05 00:00:00','2022-06-05 00:00:00',0),
('DTTFRA013','Cook Food','2022-06-05 00:00:00','2022-06-05 00:00:00','2022-06-05 00:00:00',0),
('DTTFRA013','Study','2022-06-05 00:00:00','2022-06-05 00:00:00','2022-06-05 00:00:00',0),
('DTTFRA013','Study Test2','2022-06-05 00:00:00','2022-06-07 00:00:00','2022-06-06 00:00:00',0),
('DTTFRA013','Sweep Floors','2022-06-05 00:00:00','2022-06-09 00:00:00','2022-06-07 00:00:00',0),
('DTTFRA013','Tutorial 3','2022-06-05 00:00:00','2022-06-07 00:00:00','2022-06-06 00:00:00',0);
/*!40000 ALTER TABLE `tblTodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUser`
--

DROP TABLE IF EXISTS `tblUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUser` (
  `username` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUser`
--

LOCK TABLES `tblUser` WRITE;
/*!40000 ALTER TABLE `tblUser` DISABLE KEYS */;
INSERT INTO `tblUser` VALUES
('DTTFRA013','password','Francois'),
('MGWTAD001','messi','Tadiwa'),
('VRWSHA002','password','Shakur');
/*!40000 ALTER TABLE `tblUser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27 23:16:02
