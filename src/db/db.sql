-- Susikurti 5 lenteles duomenu bazeje:
-- users su laukais: id, name, email, password, role_id
CREATE TABLE `users` (
  `user_id` int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
) ENGINE = InnoDB;

-- shop_items su laukais: id_name, price, description, image, item_type_id
CREATE TABLE `shop_items` (
  `shop_item_id` int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `shop_item_name` varchar(255) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `description` TEXT,
  `image` varchar(255) NOT NULL,
  `item_type_id` INT UNSIGNED
) ENGINE = InnoDB;

-- prideti prie shop items isArchived
ALTER TABLE `shop_items` ADD `isArchived` BOOLEAN NOT NULL DEFAULT FALSE AFTER `item_type_id`;

-- item_types su laukais: id, name
CREATE TABLE item_types (
  `item_type_id` int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `item_type_name` varchar(255) NOT NULL
) ENGINE = InnoDB;

-- orders su laukais: id, user_id, shop_item_id, quantity, total_price, status
CREATE TABLE orders (
  `orders_id` int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `hop_item_id` int UNSIGNED NOT NULL,
  `quantity` int UNSIGNED NOT NULL,
  `total_price` decimal(10, 2) NOT NULL,
  `status` boolean NOT NULL DEFAULT '0'
) ENGINE = InnoDB;

-- user_roles su laukais: id, name
CREATE TABLE user_roles (
  `user_roles_id` int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `user_roles_name` varchar(255) NOT NULL
)

-- insert into shop_items
INSERT INTO `shop_items` (`shop_item_id`, `shop_item_name`, `price`, `description`, `image`, `item_type_id`) VALUES (NULL, 'Bracelet', '259.00', 'Gold bracelet with a diamond', 'https://auksomeistrai.lt/image/cache/catalog/APYRANKES/balto-aukso-apyranke-grandinele-su-briliantu-0,03-600x600.jpg', NULL);

INSERT INTO `item_types` (`item_type_id`, `item_type_name`) VALUES (NULL, 'jewelry'), (NULL, 'clothes'), (NULL, 'accessories'), (NULL, 'shoes')