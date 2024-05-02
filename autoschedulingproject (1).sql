-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 02, 2024 at 01:23 PM
-- Server version: 10.11.6-MariaDB-0+deb12u1
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autoschedulingproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `businessList`
--

CREATE TABLE `businessList` (
  `id` int(11) DEFAULT NULL,
  `domain` varchar(255) NOT NULL,
  `businessName` varchar(255) NOT NULL,
  `ownerEmail` varchar(255) NOT NULL,
  `productKey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businessList`
--

INSERT INTO `businessList` (`id`, `domain`, `businessName`, `ownerEmail`, `productKey`) VALUES
(NULL, 'nmu.edu', 'Northern Michigan University', 'kehayden@nmu.edu', 'asfda'),
(NULL, 'gmail.com', 'Gmail', 'astrokenhayden@gmail.com', 'lkasdf'),
(NULL, 'gmail2.com', 'Bradley', 'bradleybossert@gmail.com', ''),
(NULL, 'Sinetech', 'sinetech', 'lel', '123'),
(NULL, 'local', 'Sinetech', 'yup@yahoo.net', '123'),
(NULL, 'miners-inc.com', 'Super One', 'kevinchampion@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `deptList`
--

CREATE TABLE `deptList` (
  `id` int(11) NOT NULL,
  `deptName` varchar(255) NOT NULL,
  `deptID` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `managerEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deptList`
--

INSERT INTO `deptList` (`id`, `deptName`, `deptID`, `domain`, `managerEmail`) VALUES
(1, 'Front End', 22, 'gmail.com', 'kyle@gmail.com'),
(3, 'Front End', 23, 'gmail.com', 'devin@gmail.com'),
(4, 'Back End', 24, 'gmail.com', 'dylan@gmail.com'),
(5, 'front end', 22, 'gmail2.com', 'bradleybossert@gmail.com'),
(6, 'Cat', 1, 'local', 'Mio@yahoo.net'),
(7, 'Front End', 22, 'miners-inc.com', 'oliviashelder@gmail.com'),
(8, 'Frozen', 23, 'miners-inc.com', 'jillpoirier@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `empavail`
--

CREATE TABLE `empavail` (
  `id` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `deptID` int(11) NOT NULL,
  `daysPerWeek` int(11) NOT NULL,
  `sundayStart` time DEFAULT NULL,
  `sundayEnd` time DEFAULT NULL,
  `mondayStart` time DEFAULT NULL,
  `mondayEnd` time DEFAULT NULL,
  `tuesdayStart` time DEFAULT NULL,
  `tuesdayEnd` time DEFAULT NULL,
  `wednesdayStart` time DEFAULT NULL,
  `wednesdayEnd` time DEFAULT NULL,
  `thursdayStart` time DEFAULT NULL,
  `thursdayEnd` time DEFAULT NULL,
  `fridayStart` time DEFAULT NULL,
  `fridayEnd` time DEFAULT NULL,
  `saturdayStart` time DEFAULT NULL,
  `saturdayEnd` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empavail`
--

INSERT INTO `empavail` (`id`, `domain`, `email`, `deptID`, `daysPerWeek`, `sundayStart`, `sundayEnd`, `mondayStart`, `mondayEnd`, `tuesdayStart`, `tuesdayEnd`, `wednesdayStart`, `wednesdayEnd`, `thursdayStart`, `thursdayEnd`, `fridayStart`, `fridayEnd`, `saturdayStart`, `saturdayEnd`) VALUES
(3, 'gmail.com', 'james@gmail.com', 22, 0, '00:22:00', '00:22:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'gmail2.com', 'taymae@gmail.com', 22, 0, '18:16:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'local', 'Mio@yahoo.com', 1, -1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'local', 'Mia@yahoo.net', 1, 6, NULL, NULL, '23:45:00', '00:43:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'local', '', 1, -20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'miners-inc.com', 'jessijunak@gmail.com', 22, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(12, 'miners-inc.com', 'taylornicholls@gmail.com', 22, 5, '10:00:00', '20:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '10:00:00', '20:00:00'),
(14, 'miners-inc.com', 'denisehyatt@gmail.com', 22, 5, '06:00:00', '18:00:00', '06:00:00', '18:00:00', '06:00:00', '18:00:00', '06:00:00', '18:00:00', '06:00:00', '18:00:00', '06:00:00', '18:00:00', '06:00:00', '18:00:00'),
(17, 'miners-inc.com', 'shannonlyons@gmail.com', 22, 5, '11:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '10:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '11:00:00', '22:00:00'),
(18, 'miners-inc.com', 'katietappy@gmail.com', 22, 5, '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00'),
(19, 'miners-inc.com', 'wendypyhtila@gmail.com', 22, 4, '08:00:00', '21:00:00', '08:00:00', '22:00:00', NULL, NULL, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '20:00:00'),
(20, 'miners-inc.com', 'debbiechisnell@gmail.com', 22, 4, '07:00:00', '21:00:00', '07:00:00', '21:00:00', '07:00:00', '21:00:00', '07:00:00', '21:00:00', '07:00:00', '21:00:00', '07:00:00', '21:00:00', '07:00:00', '21:00:00'),
(21, 'miners-inc.com', 'merileemickle@gmail.com', 22, 2, '06:00:00', '22:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '06:00:00', '22:00:00'),
(22, 'miners-inc.com', 'christyanderson@gmail.com', 22, 3, NULL, NULL, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', NULL, NULL),
(23, 'miners-inc.com', 'pamskauge@gmail.com', 22, 3, '08:00:00', '21:00:00', '08:00:00', '21:00:00', '08:00:00', '21:00:00', '08:00:00', '21:00:00', '08:00:00', '21:00:00', '08:00:00', '21:00:00', '08:00:00', '21:00:00'),
(24, 'miners-inc.com', 'sandracowling@gmail.com', 22, 5, '08:00:00', '19:00:00', '06:00:00', '19:00:00', '06:00:00', '19:00:00', '06:00:00', '19:00:00', '06:00:00', '19:00:00', '06:00:00', '19:00:00', '06:00:00', '19:00:00'),
(25, 'miners-inc.com', 'lindsayhetrick@gmail.com', 22, 4, '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00'),
(26, 'miners-inc.com', 'karensmith@gmail.com', 22, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(27, 'miners-inc.com', 'travisjohns@gmail.com', 23, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(28, 'miners-inc.com', 'codywayne@gmail.com', 23, 4, '08:00:00', '22:00:00', '06:00:00', '19:00:00', '06:00:00', '19:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '08:00:00', '22:00:00'),
(29, 'miners-inc.com', 'rileyvalima@gmail.com', 23, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(30, 'miners-inc.com', 'brookeyoung@gmail.com', 23, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(31, 'miners-inc.com', 'amandatilly@gmail.com', 23, 4, '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00', '06:00:00', '20:00:00'),
(32, 'miners-inc.com', 'adamwilliams@gmail.com', 23, 5, '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00', '08:00:00', '22:00:00'),
(33, 'miners-inc.com', 'kevinsicotte@gmail.com', 23, 5, '06:00:00', '21:00:00', '08:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '21:00:00'),
(34, 'miners-inc.com', 'avahart@gmail.com', 23, 4, NULL, NULL, '06:00:00', '18:00:00', '06:00:00', '20:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(35, 'miners-inc.com', 'lukekent@gmail.com', 23, 4, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(36, 'miners-inc.com', 'maxgrant@gmail.com', 23, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(37, 'miners-inc.com', 'kiawest@gmail.com', 23, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00'),
(38, 'miners-inc.com', 'alexhill@gmail.com', 23, 5, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', NULL, NULL, '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `deptID` int(11) NOT NULL,
  `empType` int(11) NOT NULL,
  `empFullorPart` varchar(4) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `email`, `deptID`, `empType`, `empFullorPart`, `domain`, `startDate`) VALUES
(3, 'kehayden@nmu.edu', 0, 0, '0', 'nmu.edu', '0000-00-00'),
(5, 'kyle@gmail.com', 22, 1, 'full', 'gmail.com', '2024-04-25'),
(6, 'kyleEmp@gmail.com', 22, 2, 'full', 'gmail.com', '2024-04-24'),
(7, 'bradley@gmail.com', 22, 1, 'full', 'gmail.com', '2024-04-25'),
(10, 'ashton@gmail.com', 22, 2, 'part', 'gmail.com', '2024-04-30'),
(11, 'taymae@gmail.com', 22, 2, 'part', 'gmail2.com', '2024-04-28'),
(12, 'brad@gmail.com', 22, 1, 'full', 'gmail2.com', '2024-04-28'),
(13, 'Mio@yahoo.com', 1, 1, 'full', 'local', '2024-04-30'),
(14, 'Mia@yahoo.net', 1, 2, 'part', 'local', '2024-04-30'),
(15, 'Mio@yahoo.net', 1, 1, 'full', 'local', '2024-05-01'),
(16, 'Milo@yahoo.net', 1, 1, 'full', 'local', '2024-04-30'),
(17, 'oliviashelder@gmail.com', 22, 1, 'full', 'miners-inc.com', '2020-04-01'),
(18, 'jessijunak@gmail.com', 22, 2, 'full', 'miners-inc.com', '2023-02-21'),
(19, 'taylornicholls@gmail.com', 22, 2, 'full', 'miners-inc.com', '2023-09-29'),
(20, 'drewpatraw@gmail.com', 22, 2, 'full', 'miners-inc.com', '2023-11-16'),
(21, 'denisehyatt@gmail.com', 22, 2, 'full', 'miners-inc.com', '2024-04-02'),
(22, 'shannonlyons@gmail.com', 22, 2, 'full', 'miners-inc.com', '2024-04-11'),
(23, 'katietappy@gmail.com', 22, 2, 'part', 'miners-inc.com', '2024-03-20'),
(24, 'wendypyhtila@gmail.com', 22, 2, 'part', 'miners-inc.com', '2024-06-11'),
(25, 'debbiechisnell@gmail.com', 22, 2, 'part', 'miners-inc.com', '2024-04-25'),
(26, 'merileemickle@gmail.com', 22, 2, 'part', 'miners-inc.com', '2023-08-08'),
(27, 'christyanderson@gmail.com', 22, 2, 'part', 'miners-inc.com', '2024-04-07'),
(28, 'pamskauge@gmail.com', 22, 2, 'part', 'miners-inc.com', '2023-04-11'),
(29, 'sandracowling@gmail.com', 22, 2, 'part', 'miners-inc.com', '2022-06-27'),
(30, 'lindsayhetrick@gmail.com', 22, 2, 'part', 'miners-inc.com', '2023-07-12'),
(31, 'karensmith@gmail.com', 22, 2, 'part', 'miners-inc.com', '2024-05-17'),
(32, 'jillpoirier@gmail.com', 23, 1, 'full', 'miners-inc.com', '2023-11-13'),
(33, 'travisjohns@gmail.com', 23, 2, 'part', 'miners-inc.com', '2020-06-24'),
(34, 'codywayne@gmail.com', 23, 2, 'part', 'miners-inc.com', '2023-12-13'),
(35, 'rileyvalima@gmail.com', 23, 2, 'part', 'miners-inc.com', '2023-07-27'),
(36, 'brookeyoung@gmail.com', 23, 2, 'part', 'miners-inc.com', '2023-07-14'),
(37, 'amandatilly@gmail.com', 23, 2, 'part', 'miners-inc.com', '2022-09-28'),
(38, 'adamwilliams@gmail.com', 23, 2, 'part', 'miners-inc.com', '2022-07-12'),
(39, 'kevinsicotte@gmail.com', 23, 2, 'part', 'miners-inc.com', '2024-04-05'),
(40, 'avahart@gmail.com', 23, 2, 'part', 'miners-inc.com', '2023-12-03'),
(41, 'lukekent@gmail.com', 23, 2, 'part', 'miners-inc.com', '2023-04-05'),
(42, 'maxgrant@gmail.com', 23, 2, 'part', 'miners-inc.com', '2019-03-10'),
(43, 'kiawest@gmail.com', 23, 2, 'part', 'miners-inc.com', '2017-11-27'),
(44, 'alexhill@gmail.com', 23, 2, 'part', 'miners-inc.com', '2020-03-31');

-- --------------------------------------------------------

--
-- Table structure for table `hoursPerDay`
--

CREATE TABLE `hoursPerDay` (
  `id` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `deptID` int(11) NOT NULL,
  `weekDate` date NOT NULL,
  `sundayHours` int(11) DEFAULT NULL,
  `mondayHours` int(11) DEFAULT NULL,
  `tuesdayHours` int(11) DEFAULT NULL,
  `wednesdayHours` int(11) DEFAULT NULL,
  `thursdayHours` int(11) DEFAULT NULL,
  `fridayHours` int(11) DEFAULT NULL,
  `saturdayHours` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `OperatingHours`
--

CREATE TABLE `OperatingHours` (
  `id` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `sundayOpen` time DEFAULT NULL,
  `sundayClose` time DEFAULT NULL,
  `mondayOpen` time DEFAULT NULL,
  `mondayClose` time DEFAULT NULL,
  `tuesdayOpen` time DEFAULT NULL,
  `tuesdayClose` time DEFAULT NULL,
  `wednesdayOpen` time DEFAULT NULL,
  `wednesdayClose` time DEFAULT NULL,
  `thursdayOpen` time DEFAULT NULL,
  `thursdayClose` time DEFAULT NULL,
  `fridayOpen` time DEFAULT NULL,
  `fridayClose` time DEFAULT NULL,
  `saturdayOpen` time DEFAULT NULL,
  `saturdayClose` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `OperatingHours`
--

INSERT INTO `OperatingHours` (`id`, `domain`, `sundayOpen`, `sundayClose`, `mondayOpen`, `mondayClose`, `tuesdayOpen`, `tuesdayClose`, `wednesdayOpen`, `wednesdayClose`, `thursdayOpen`, `thursdayClose`, `fridayOpen`, `fridayClose`, `saturdayOpen`, `saturdayClose`) VALUES
(8, 'gmail2.com', '22:32:00', '12:32:00', '22:32:00', '13:33:00', '22:32:00', '13:33:00', '22:32:00', '13:33:00', '22:32:00', '13:33:00', '22:32:00', '13:33:00', NULL, NULL),
(10, 'local', '01:32:00', '22:32:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'local', '04:33:00', '02:34:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'miners-inc.com', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', '06:00:00', '22:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ProductValidity`
--

CREATE TABLE `ProductValidity` (
  `id` int(11) NOT NULL,
  `productKey` int(11) NOT NULL,
  `used` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `weekStart` date NOT NULL,
  `domain` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `deptID` int(11) NOT NULL,
  `sunday` text DEFAULT NULL,
  `monday` text DEFAULT NULL,
  `tuesday` text DEFAULT NULL,
  `wednesday` text DEFAULT NULL,
  `thursday` text DEFAULT NULL,
  `friday` text DEFAULT NULL,
  `saturday` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `weekStart`, `domain`, `email`, `deptID`, `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`) VALUES
(1, '2024-04-28', 'miners-inc.com', 'jessijunak@gmail.com', 22, '', '6am-2pm', '6am-2pm', '', '6am-2pm', '6am-2pm', '6am-2pm'),
(2, '2024-04-28', 'miners-inc.com', 'taylornicholls@gmail.com', 22, '', '6am-2pm', '6am-2pm', '', '6am-2pm', '6am-2pm', '10am-6pm'),
(3, '2024-04-28', 'miners-inc.com', 'denisehyatt@gmail.com', 22, '', '6am-2pm', '6am-2pm', '', '6am-2pm', '6am-2pm', '6am-2pm'),
(4, '2024-04-28', 'miners-inc.com', 'shannonlyons@gmail.com', 22, '', '8am-4pm', '8am-4pm', '', '8am-4pm', '8am-4pm', '11am-7pm'),
(5, '2024-04-28', 'miners-inc.com', 'sandracowling@gmail.com', 22, '', '10am-6pm', '10am-6pm', '', '10am-6pm', '10am-6pm', '6am-2pm'),
(6, '2024-04-28', 'miners-inc.com', 'pamskauge@gmail.com', 22, '', '11am-7pm', '11am-7pm', '', '11am-7pm', '', ''),
(7, '2024-04-28', 'miners-inc.com', 'lindsayhetrick@gmail.com', 22, '', '11am-3pm', '11am-3pm', '', '11am-3pm', '11am-7pm', ''),
(8, '2024-04-28', 'miners-inc.com', 'merileemickle@gmail.com', 22, '', '', '', '', '', '', '8am-4pm'),
(9, '2024-04-28', 'miners-inc.com', 'katietappy@gmail.com', 22, '', '12pm-8pm', '12pm-8pm', '', '12pm-8pm', '11am-3pm', '11am-3pm'),
(10, '2024-04-28', 'miners-inc.com', 'christyanderson@gmail.com', 22, '', '2pm-10pm', '2pm-10pm', '', '2pm-10pm', '', ''),
(11, '2024-04-28', 'miners-inc.com', 'debbiechisnell@gmail.com', 22, '', '', '', '', '', '12pm-8pm', '12pm-8pm'),
(12, '2024-04-28', 'miners-inc.com', 'karensmith@gmail.com', 22, '', '2pm-10pm', '2pm-10pm', '', '2pm-10pm', '2pm-10pm', '2pm-10pm'),
(13, '2024-04-28', 'miners-inc.com', 'wendypyhtila@gmail.com', 22, '', '2pm-10pm', '', '', '2pm-10pm', '2pm-10pm', '');

-- --------------------------------------------------------

--
-- Table structure for table `timeOffRequests`
--

CREATE TABLE `timeOffRequests` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `approval` int(11) NOT NULL DEFAULT 0,
  `domain` varchar(255) NOT NULL,
  `deptid` int(11) NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timeOffRequests`
--

INSERT INTO `timeOffRequests` (`id`, `email`, `date`, `approval`, `domain`, `deptid`, `reason`) VALUES
(10, 'ashton@gmail.com', '2024-06-06', 3, 'gmail.com', 22, 'ewadvfbdgrweafdvdgrweaf'),
(11, 'taymae@gmail.com', '2024-04-22', 1, 'gmail2.com', 22, 'dsfsdfdfds'),
(13, 'taymae@gmail.com', '2024-04-29', 1, 'gmail2.com', 22, 'lllhifjcv'),
(16, 'ashton@gmail.com', '2024-04-17', 1, 'gmail.com', 22, 'fasewf'),
(17, 'ashton@gmail.com', '2024-04-20', 1, 'gmail.com', 22, 'fasewfefawas'),
(18, 'Mia@yahoo.net', '2024-05-02', 1, 'local', 1, 'cause i sleep'),
(21, 'wendypyhtila@gmail.com', '2024-05-07', 1, 'miners-inc.com', 22, 'feewarwea4wefdfgrtawref');

-- --------------------------------------------------------

--
-- Table structure for table `userDB`
--

CREATE TABLE `userDB` (
  `id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `acctType` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `domain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userDB`
--

INSERT INTO `userDB` (`id`, `email`, `password`, `acctType`, `fname`, `lname`, `domain`) VALUES
(NULL, 'kehayden@nmu.edu', '$2a$10$J2F/1CSlaRpkNG1KJO4YvOWtD.l5GvqjA6VkmjVHGvYysAPRlGvZK', 0, 'Kendra', 'Hayden', 'nmu.edu'),
(NULL, 'astrokenhayden@gmail.com', '$2a$10$7eNb1mduDTGtZra7nFTIl.eL1YcRj7.lqn34ltoy.VUIecxq8wK6m', 0, 'Kendra', 'Hayden', 'gmail.com'),
(NULL, 'kyle@gmail.com', '$2a$10$Ce3buFz/ldafcV8Sm.84CeOiCu38wmmcpa7tfzGBsyT2GwHMNY6nO', 1, 'Kyle', 'Kyles', 'gmail.com'),
(NULL, 'kyleEmp@gmail.com', '$2a$10$Ce3buFz/ldafcV8Sm.84CeOiCu38wmmcpa7tfzGBsyT2GwHMNY6nO', 2, 'Kyle', 'Employee', 'gmail.com'),
(NULL, 'bradley@gmail.com', '$2a$10$qHEUFC1iQDbRFT2KHuPm.ebekEni1BvTl88HaJgGPcv3tqtbxW6xK', 1, 'Bradley', 'Bossert', 'gmail.com'),
(NULL, 'bradleybossert@gmail.com', '$2a$10$OTpFABvUW6uG5DdwtHqH3Ov4LXXy/ObZaWirZM1qtNhOucR5CyUVu', 0, 'Bradley', 'Bossert', 'gmail2.com'),
(NULL, 'ashton@gmail.com', '$2a$10$bCrh8hJtSKQTqRD9UmxJY.INWwvURuGtwsBZ7YdSHb8p2CQZekUxW', 2, 'Ashton', 'Hutchinson', 'gmail.com'),
(NULL, 'taymae@gmail.com', '$2a$10$wAxSb2iUnpVL7QcWwtgj9OypBwvUjjmaY7XEwSRGJFSscLWM0j0I2', 2, 'tay', 'nic', 'gmail2.com'),
(NULL, 'brad@gmail.com', '$2a$10$wAxSb2iUnpVL7QcWwtgj9OMfw9c217seRiLXrg.NF0KXp9FIR1Lr.', 1, 'brad', 'boss', 'gmail2.com'),
(NULL, 'lel', '$2a$10$xMbGKQKmJDTjVOIE93aWselGkcrrlE4sSscpditV2SEUBLainaPz6', 0, 'Hayden', 'is a nerd', 'Sinetech'),
(NULL, 'yup@yahoo.net', '$2a$10$xMbGKQKmJDTjVOIE93aWseAeD5Z2i5N3YWEjdkfIxAILu/A7p0hKW', 0, 'Hayden', 'is a nerd', 'local'),
(NULL, 'Mio@yahoo.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseAeD5Z2i5N3YWEjdkfIxAILu/A7p0hKW', 1, 'Mio', 'Hutchinson', 'local'),
(NULL, 'Mia@yahoo.net', '$2a$10$xMbGKQKmJDTjVOIE93aWseAeD5Z2i5N3YWEjdkfIxAILu/A7p0hKW', 2, 'Mia', 'Hutchinson', 'local'),
(NULL, 'Mio@yahoo.net', '$2a$10$xMbGKQKmJDTjVOIE93aWseAeD5Z2i5N3YWEjdkfIxAILu/A7p0hKW', 1, 'Mio', 'Hutchinson', 'local'),
(NULL, 'Milo@yahoo.net', '$2a$10$xMbGKQKmJDTjVOIE93aWseAeD5Z2i5N3YWEjdkfIxAILu/A7p0hKW', 1, 'Milo', 'Hutchinson', 'local'),
(NULL, 'kevinchampion@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 0, 'Kevin', 'Champion', 'miners-inc.com'),
(NULL, 'oliviashelder@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 1, 'Olivia', 'Shelder', 'miners-inc.com'),
(NULL, 'jessijunak@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Jessi', 'Junak', 'miners-inc.com'),
(NULL, 'taylornicholls@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Taylor', 'Nicholls', 'miners-inc.com'),
(NULL, 'drewpatraw@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Drew', 'Patraw', 'miners-inc.com'),
(NULL, 'denisehyatt@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Denise', 'Hyatt', 'miners-inc.com'),
(NULL, 'shannonlyons@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Shannon', 'Lyons', 'miners-inc.com'),
(NULL, 'katietappy@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Katie', 'Tappy', 'miners-inc.com'),
(NULL, 'wendypyhtila@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Wendy', 'Pyhtila', 'miners-inc.com'),
(NULL, 'debbiechisnell@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Debbie', 'Chisnell', 'miners-inc.com'),
(NULL, 'merileemickle@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Merilee', 'Mickle', 'miners-inc.com'),
(NULL, 'christyanderson@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Christy', 'Anderson', 'miners-inc.com'),
(NULL, 'pamskauge@gmail.com', '$2a$10$xMbGKQKmJDTjVOIE93aWseB/6ybugEqxCgPgYQkbA7/.sZdr9nZ9a', 2, 'Pam', 'Skauge', 'miners-inc.com'),
(NULL, 'sandracowling@gmail.com', '$2a$10$ANvkLJtSb8p2vzknhFj/jOK2gancXcx0re0dszppb6PKaWcwtmM0.', 2, 'Sandra', 'Cowling', 'miners-inc.com'),
(NULL, 'lindsayhetrick@gmail.com', '$2a$10$ANvkLJtSb8p2vzknhFj/jOK2gancXcx0re0dszppb6PKaWcwtmM0.', 2, 'Lindsay', 'Hetrick', 'miners-inc.com'),
(NULL, 'karensmith@gmail.com', '$2a$10$ANvkLJtSb8p2vzknhFj/jOK2gancXcx0re0dszppb6PKaWcwtmM0.', 2, 'Karen', 'Smith', 'miners-inc.com'),
(NULL, 'jillpoirier@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 1, 'Jill', 'Poirier', 'miners-inc.com'),
(NULL, 'travisjohns@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Travis', 'Johns', 'miners-inc.com'),
(NULL, 'codywayne@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Cody', 'Wayne', 'miners-inc.com'),
(NULL, 'rileyvalima@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Riley', 'Valima', 'miners-inc.com'),
(NULL, 'brookeyoung@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Brooke', 'Young', 'miners-inc.com'),
(NULL, 'amandatilly@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Amanda', 'Tilly', 'miners-inc.com'),
(NULL, 'adamwilliams@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Adam', 'Williams', 'miners-inc.com'),
(NULL, 'kevinsicotte@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Kevin', 'Sicotte', 'miners-inc.com'),
(NULL, 'avahart@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Ava', 'Hart', 'miners-inc.com'),
(NULL, 'lukekent@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Luke', 'Kent', 'miners-inc.com'),
(NULL, 'maxgrant@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Max', 'Grant', 'miners-inc.com'),
(NULL, 'kiawest@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Kia', 'West', 'miners-inc.com'),
(NULL, 'alexhill@gmail.com', '$2a$10$IDd9PUEf.Q41xABLLcDIyOKyrbsyBbQumNaHR08aeIPW4/t3pJrFW', 2, 'Alex', 'Hill', 'miners-inc.com');

-- --------------------------------------------------------

--
-- Table structure for table `usertab`
--

CREATE TABLE `usertab` (
  `userid` bigint(20) NOT NULL,
  `useremail` varchar(300) NOT NULL,
  `userpassword` binary(60) NOT NULL,
  `salt` int(10) NOT NULL,
  `businessid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deptList`
--
ALTER TABLE `deptList`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empavail`
--
ALTER TABLE `empavail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hoursPerDay`
--
ALTER TABLE `hoursPerDay`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `OperatingHours`
--
ALTER TABLE `OperatingHours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeOffRequests`
--
ALTER TABLE `timeOffRequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertab`
--
ALTER TABLE `usertab`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deptList`
--
ALTER TABLE `deptList`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `empavail`
--
ALTER TABLE `empavail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `hoursPerDay`
--
ALTER TABLE `hoursPerDay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OperatingHours`
--
ALTER TABLE `OperatingHours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `timeOffRequests`
--
ALTER TABLE `timeOffRequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `usertab`
--
ALTER TABLE `usertab`
  MODIFY `userid` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
