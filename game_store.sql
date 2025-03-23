-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2025 at 05:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_game`
--

CREATE TABLE `add_game` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `desc1` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `release1` date NOT NULL,
  `platforms` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `developers` varchar(255) NOT NULL,
  `publishers` varchar(255) NOT NULL,
  `inCart` tinyint(1) DEFAULT 0,
  `selected` tinyint(1) DEFAULT 0,
  `isHovered` tinyint(1) DEFAULT 0,
  `isLiked` tinyint(1) DEFAULT 0,
  `rating` decimal(3,1) DEFAULT 0.0,
  `cover` varchar(255) NOT NULL,
  `footage` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `add_game`
--

INSERT INTO `add_game` (`id`, `name`, `surname`, `price`, `desc1`, `link`, `release1`, `platforms`, `genre`, `developers`, `publishers`, `inCart`, `selected`, `isHovered`, `isLiked`, `rating`, `cover`, `footage`, `created_at`) VALUES
(1, 'PUBGE', 'PUB', 1700.00, 'The Battlefield series goes back to its roots in a never-before-seen portrayal of World War 2. Take on physical, all-out multiplayer with your squad in modes like the vast Grand Operations and the cooperative Combined Arms, or witness human drama set against global combat in the single player War Stories. As you fight in epic, unexpected locations across the globe, enjoy the richest and most immersive', 'https://www.cyberpunk.net/', '2025-03-13', 'SHADOM', 'Adventure', 'TeamX', 'go', 0, 0, 0, 0, 5.0, 'https://res.cloudinary.com/gianlucajahn/image/upload/c_scale,q_100,w_500/v1658188604/cyberpunk_n6jitl.jpg', 'https://res.cloudinary.com/gianlucajahn/image/upload/v1658188604/cyberpunk_n6jitl.jpg@https://res.cloudinary.com/gianlucajahn/image/upload/c_scale,q_100,w_1920/v1658235373/cyberpunk_1_s00vwf.jpg@https://res.cloudinary.com/gianlucajahn/image/upload/c_scale', '2025-03-13 16:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `admain`
--

CREATE TABLE `admain` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admain`
--

INSERT INTO `admain` (`id`, `fullName`, `email`, `username`, `password`, `created_at`, `last_login`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin@gmail.com', '$2y$10$4XRPXzlIxN2mWFyxuNHHj.hxdWe.TNqe71.YjtU5OaKOwTnpwrxc2', '2025-03-13 16:50:32', '2025-03-13 16:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `username`, `password`, `created_at`, `last_login`) VALUES
(1, 'moahmed', 'moahmed@gmail.com', 'moahmed@gmail.com', '$2y$10$Eump1yoIeoCrQFFhO5QSqekeLDxMstvyJxTnoTiv7ZUkbsz/.Uvi6', '2025-03-13 16:49:10', '2025-03-13 16:53:55'),
(2, 'adminq', 'adminq@gmail.com', 'adminq@gmail.com', '$2y$10$4XRPXzlIxN2mWFyxuNHHj.hxdWe.TNqe71.YjtU5OaKOwTnpwrxc2', '2025-03-13 16:52:47', '2025-03-13 16:53:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_game`
--
ALTER TABLE `add_game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admain`
--
ALTER TABLE `admain`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_game`
--
ALTER TABLE `add_game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admain`
--
ALTER TABLE `admain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
