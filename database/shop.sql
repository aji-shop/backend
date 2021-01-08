DROP DATABASE IF EXISTS `shop`;
CREATE DATABASE `shop`;
USE `shop`;

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `weight` float NOT NULL,
  `category_id` int
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text
);


DROP TABLE `order`;
CREATE TABLE `order` (
  `id` VARCHAR(255) PRIMARY KEY,
  `date` datetime,
  `state_id` int,
  `user_id` int
);

CREATE TABLE `order_state` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) COMMENT 'Not Approved, Approved, Cancelled, Executed'
);

CREATE TABLE `list` (
  `id` VARCHAR(255), -- the same as an order's id
  `product_id` int,
  `count` int,
  PRIMARY KEY (`id`, `product_id`)
);

DROP TABLE `user`;
CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text,
  `email` text UNIQUE,
  `phone` text,
  `password` text,
  `salt` text
);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`state_id`) REFERENCES `order_state` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `list` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

