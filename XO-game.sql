-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 25, 2022 at 08:11 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `XO-game`
--

-- --------------------------------------------------------

--
-- Table structure for table `AvailableRooms`
--

CREATE TABLE `AvailableRooms` (
  `Name` varchar(10) NOT NULL,
  `P1Name` varchar(50) NOT NULL DEFAULT 'Player One',
  `P2Name` varchar(50) NOT NULL DEFAULT 'Player Two',
  `PlayerOne` tinyint(1) NOT NULL DEFAULT 0,
  `PlayerTwo` tinyint(1) NOT NULL DEFAULT 0,
  `WhoseTurn` varchar(10) NOT NULL DEFAULT 'Player One',
  `TilesValue` varchar(150) DEFAULT '["","","","","","","","",""]',
  `IsStarted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `AvailableRooms`
--

INSERT INTO `AvailableRooms` (`Name`, `P1Name`, `P2Name`, `PlayerOne`, `PlayerTwo`, `WhoseTurn`, `TilesValue`, `IsStarted`) VALUES
('Room 1', 'Player One', 'Player Two', 0, 0, 'Player One', '[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]', 0),
('Room 2', 'Player One', 'Player Two', 0, 0, 'Player One', '[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]', 0),
('Room 3', 'Player One', 'Player Two', 0, 0, 'Player One', '[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]', 0),
('Room 4', 'Joe', 'Dhee', 0, 1, 'Player One', '[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]', 1),
('Room 5', 'Player One', 'Player Two', 0, 0, 'Player One', '[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AvailableRooms`
--
ALTER TABLE `AvailableRooms`
  ADD PRIMARY KEY (`Name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
