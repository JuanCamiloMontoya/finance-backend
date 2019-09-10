-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.21-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for db_finance
CREATE DATABASE IF NOT EXISTS `db_finance` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_finance`;

-- Dumping structure for table db_finance.account
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `initial_value` double NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_account_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_account_person` (`fk_user`) USING BTREE,
  KEY `FK_account_account_type` (`fk_account_type`) USING BTREE,
  CONSTRAINT `FK_account_type` FOREIGN KEY (`fk_account_type`) REFERENCES `account_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_account_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Dumping data for table db_finance.account: ~4 rows (approximately)
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
REPLACE INTO `account` (`id`, `title`, `initial_value`, `fk_user`, `fk_account_type`) VALUES
	(1, 'cuenta 1', 10000, 1, 1),
	(2, 'cuenta 2', 20000, 1, 2),
	(3, 'cuenta 2.1', 10000, 2, 1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

-- Dumping structure for table db_finance.account_type
CREATE TABLE IF NOT EXISTS `account_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `state` varchar(10) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Dumping data for table db_finance.account_type: ~3 rows (approximately)
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
REPLACE INTO `account_type` (`id`, `name`, `state`) VALUES
	(1, 'Cuenta de Ahorro', '1'),
	(2, 'cuenta corrriente', '1'),
	(3, 'chupa el perro', '1');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;

-- Dumping structure for table db_finance.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `state` varchar(10) NOT NULL DEFAULT 'Active',
  `fk_category` int(11) DEFAULT NULL,
  `fk_movement_type` int(11) DEFAULT NULL,
  `fk_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_category_category` (`fk_category`) USING BTREE,
  KEY `fk_category_movement_type_1` (`fk_movement_type`),
  KEY `fk_category_user_1` (`fk_user`),
  CONSTRAINT `FK1_category` FOREIGN KEY (`fk_category`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_category_movement_type_1` FOREIGN KEY (`fk_movement_type`) REFERENCES `movement_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_category_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Dumping data for table db_finance.category: ~9 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
REPLACE INTO `category` (`id`, `name`, `state`, `fk_category`, `fk_movement_type`, `fk_user`) VALUES
	(1, 'Alimentacion', '1', NULL, 1, NULL),
	(2, 'Educacion ', '1', NULL, 1, NULL),
	(3, 'Entretenimiento', '1', NULL, 1, NULL),
	(4, 'Facturas', '1', NULL, 1, NULL),
	(5, 'Hogar', '1', NULL, 1, NULL),
	(6, 'Ropa', '1', NULL, 1, NULL),
	(7, 'Regalo', '1', NULL, 1, NULL),
	(8, 'Me Pagaron', '1', NULL, 2, NULL),
	(11, 'Merienda', '1', 1, 1, 1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table db_finance.debt
CREATE TABLE IF NOT EXISTS `debt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `value` decimal(10,0) NOT NULL DEFAULT '0',
  `key` varchar(12) NOT NULL DEFAULT '0',
  `state` varchar(10) NOT NULL DEFAULT 'Active',
  `fk_debtor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_debt_debtor_1` (`fk_debtor`),
  CONSTRAINT `FK_debt_debtor` FOREIGN KEY (`fk_debtor`) REFERENCES `debtor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table db_finance.debt: ~2 rows (approximately)
/*!40000 ALTER TABLE `debt` DISABLE KEYS */;
REPLACE INTO `debt` (`id`, `description`, `date`, `value`, `key`, `state`, `fk_debtor`) VALUES
	(1, 'fdsafsd', '2019-09-02', 5000, 'revenue', '1', 2),
	(5, 'por una papitas', '2019-09-02', 1500, 'expenses', '1', 1);
/*!40000 ALTER TABLE `debt` ENABLE KEYS */;

-- Dumping structure for table db_finance.debtor
CREATE TABLE IF NOT EXISTS `debtor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL DEFAULT 'Active',
  `fk_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_debtor_user_1` (`fk_user`),
  CONSTRAINT `fk_debtor_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table db_finance.debtor: ~2 rows (approximately)
/*!40000 ALTER TABLE `debtor` DISABLE KEYS */;
REPLACE INTO `debtor` (`id`, `name`, `state`, `fk_user`) VALUES
	(1, 'dadsa', '1', 2),
	(2, 'antonieta', '1', 1);
/*!40000 ALTER TABLE `debtor` ENABLE KEYS */;

-- Dumping structure for table db_finance.movement
CREATE TABLE IF NOT EXISTS `movement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` double NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL DEFAULT 'Active',
  `fk_category` int(11) DEFAULT NULL,
  `fk_account` int(11) NOT NULL,
  `fk_debt` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_movement_account` (`fk_account`) USING BTREE,
  KEY `FK_movement_category` (`fk_category`) USING BTREE,
  KEY `fk_movement_debt_1` (`fk_debt`),
  CONSTRAINT `FK_movement_account` FOREIGN KEY (`fk_account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_movement_category` FOREIGN KEY (`fk_category`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_movement_debt` FOREIGN KEY (`fk_debt`) REFERENCES `debt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Dumping data for table db_finance.movement: ~6 rows (approximately)
/*!40000 ALTER TABLE `movement` DISABLE KEYS */;
REPLACE INTO `movement` (`id`, `value`, `date`, `description`, `state`, `fk_category`, `fk_account`, `fk_debt`) VALUES
	(1, 10000, '2019-07-25 23:06:28', 'description1', '1', 1, 1, NULL),
	(2, 5000, '2019-05-25 23:07:06', 'desc 2', '2', 11, 1, NULL),
	(3, 10230, '2019-01-28 13:47:36', 'weqweqweqwe', '2', 7, 1, NULL),
	(4, 100, '2019-12-27 14:19:49', 'dasdasdasd', '2', 8, 1, NULL),
	(5, 1000, '2019-08-31 17:28:01', 'dasdasfagsfd', '1', 2, 2, NULL),
	(16, 1800, '2019-08-29 13:34:34', 'fdsf', '1', NULL, 2, NULL),
	(17, 1500, '2019-09-02 15:23:30', 'descripcion', '1', NULL, 1, 5);
/*!40000 ALTER TABLE `movement` ENABLE KEYS */;

-- Dumping structure for table db_finance.movement_type
CREATE TABLE IF NOT EXISTS `movement_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `state` varchar(10) DEFAULT 'Active',
  `key` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Dumping data for table db_finance.movement_type: ~2 rows (approximately)
/*!40000 ALTER TABLE `movement_type` DISABLE KEYS */;
REPLACE INTO `movement_type` (`id`, `name`, `state`, `key`) VALUES
	(1, 'Gastos', '1', 'expense'),
	(2, 'Ingresos', '1', 'revenue');
/*!40000 ALTER TABLE `movement_type` ENABLE KEYS */;

-- Dumping structure for table db_finance.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `use_email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Dumping data for table db_finance.user: ~3 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `name`, `email`, `password`) VALUES
	(1, 'antonio', 'user1@udla.edu.co', 'user123'),
	(2, 'carlos', 'dsada@udla.edu.co', '12345'),
	(3, 'kamilo', 'auntonileal123@hotmail.com', '12345');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
