-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 05:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beleka`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `item_type_id` int(10) UNSIGNED NOT NULL,
  `item_type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`item_type_id`, `item_type_name`) VALUES
(1, 'jewelry'),
(2, 'clothes'),
(3, 'accessories'),
(4, 'shoes');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `shop_item_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('Unpaid','Paid','Cancelled','') NOT NULL DEFAULT 'Unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_items`
--

CREATE TABLE `shop_items` (
  `shop_item_id` int(10) UNSIGNED NOT NULL,
  `shop_item_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(1000) NOT NULL,
  `item_type_id` int(10) UNSIGNED NOT NULL,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_items`
--

INSERT INTO `shop_items` (`shop_item_id`, `shop_item_name`, `price`, `description`, `image`, `item_type_id`, `is_archived`) VALUES
(1, 'Necklace', 89.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFhzZV64r5Ni1ZsVmyt9gCSdJkmSYYY6YoQ&usqp=CAU', '2wCEAAkGBxMHBhUIBxQWFRUXFxoXFhcVGB0VHhkWHxcdGRUbHRcbHikhGxolGxsdLTEhJykrLy8uGCAzOzMvNyktLisBCgoKDg0OGxAQGi0lICYvLTYtLS4tLS0tLTgvLS0vLS0tLS0tLTU1LS0tLTUtLS0tLSstLS0yLi0tLSstKy0rK', 1, 0),
(2, 'Backpack', 45.55, 'Backpacks for women are available in various sizes, colors, and capacities.\r\n\r\nRead more at:\r\nhttps://economictimes.indiatimes.com/top-trending-products/lifestyle/best-backpacks-for-women/articleshow/94816712.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7M2Sj1fIpjFgMhwVSUhFvmB1yUxUR8RTCA&usqp=CAU', 3, 0),
(3, 'Backpack', 99.99, 'Women\'s backpacks can be carried as daily carry-ons and safely store all of their essentials.\r\n\r\nRead more at:\r\nhttps://economictimes.indiatimes.com/top-trending-products/lifestyle/best-backpacks-for-women/articleshow/94816712.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSeBXpEl_W_pODek2GYtvyXrKMazFoskpYA&usqp=CAU', 3, 0),
(4, 'Maxi Dress', 120.00, 'The Pure White Cotton Maxi Dress is a stunning fit and flare dress that acts as a canvas to experiment and leave a statement.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZN2dyWWlSJ9-FljSEPjkVeVlghoissyoiTw&usqp=CAU', 2, 0),
(5, 'Cotton Dress', 150.00, 'Dress your best in this beautiful blue & white tiered maxi dress!', 'https://www.bunaai.com/cdn/shop/products/Cottonsalwarsuitonlineindia-6833-2.jpg?v=1663673908', 2, 0),
(6, 'Roadster', 500.00, 'The Lifestyle Co. Women White & Pink Woven Design Comfort Insole Mesh Sneakers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEQOMZktX4-sAxYLAj2LRGD356qxjSst8mkA&usqp=CAU', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role_id`) VALUES
(1, 'Kamila Shon', 'camila@gmail.com', 'Cami2lasdf', 2),
(2, 'Aleksandra Chvatovaite', 'vieninteleprincese@gmail.com', 'Aleksandra123', 1),
(3, 'Veronica Piers', 'vera@mail.com', 'laiasdkfsd', 2),
(4, 'Labas Rytas', 'rytas@gmail.com', 'labasrytas58', 2),
(5, 'Tomas Kaminas', 'Tomukas@gmail.com', 'kami567nas', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_roles_id` int(10) UNSIGNED NOT NULL,
  `user_roles_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_roles_id`, `user_roles_name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`item_type_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`shop_item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_roles_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `item_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `shop_item_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_roles_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
