-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: sportland
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productCart`
--

DROP TABLE IF EXISTS `productCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productCart` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productCart_FK` (`user_id`),
  KEY `productCart_FK_1` (`product_id`),
  CONSTRAINT `productCart_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `productCart_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productCart`
--

LOCK TABLES `productCart` WRITE;
/*!40000 ALTER TABLE `productCart` DISABLE KEYS */;
/*!40000 ALTER TABLE `productCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productCategory`
--

DROP TABLE IF EXISTS `productCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productCategory` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productCategory`
--

LOCK TABLES `productCategory` WRITE;
/*!40000 ALTER TABLE `productCategory` DISABLE KEYS */;
INSERT INTO `productCategory` VALUES (1,'Gym', NULL, NULL, NULL),(2,'Hombre', NULL, NULL, NULL),(3,'Mujer', NULL, NULL, NULL);
/*!40000 ALTER TABLE `productCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`category_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`category_id`) REFERENCES `productCategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bicicleta Fija','Bicicleta Fija',565,1,'bicicleta_fija.png',NULL,NULL,NULL),(2,'Mancuernas recubiertas de 3kg','Mancuernas recubiertas de 3kg',6600,1,'mancuerna_naranja.png',NULL,NULL,NULL),(3,'Bandas Circulares','Cintas Circulares',1600,1,'bandas_circulares.JPG',NULL,NULL,NULL),(4,'Cinta de correr','Maquina de Correr',61000,1,'cinta_de_correr.png',NULL,NULL,NULL),(5,'Camiseta de San Martín de Tucumán','Camiseta de SMT',5000,2,'camiseta-SMTUC.jpg',NULL,NULL,NULL),(6,'Camiseta de Barcelona','Camiseta de BCN',5000,3,'camiseta-barcelona.jpg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `image` varchar(100) NOT NULL,
  `category` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Leo','Messi','leo@messi.psg','$2a$10$AXuN3Nmw3Rng6mbN0eeLzeFsv8Vhvj8m9Oa7/VHQU1TawWziOxiaa','user-1633362048355.jpeg','client',NULL,NULL,NULL),(2,'Cristiano','Ronaldo','cr7@cr7.com','$2a$10$YpJm451QYXfsuT.LfQkDN.gqZbo/DCy7o6yvzcq9DYS2wrBfx/8ym','user-1633364055545.jpg','client',NULL,NULL,NULL),(3,'Soy','Administrador','admin@sportland.com','$2a$10$iXuGVqKZzpFTM0nEZxcOWudxz.JzIFzzuw3SMLMy/IXTVHD0A7BF6','user-1633546124974.png','admin',NULL,NULL,NULL),(4,'Otro','Usuario','otro@usuario.com','$2a$10$ewsaoEYqRKpdYrWwQioFLOrTIKJRZaAMApRRkkXeWQE7NXzC4YG2W','user-1633546268409.jpeg','client',NULL,NULL,NULL),(5,'Prueba','Prueba','a@b.com','$2a$10$PTeA5NX1D5IVzcIneX/YI.D19VEowmDXHTIGfnh4AqOdtmSb3maFi','user-1633548879696.jpeg','client',NULL,NULL,NULL),(6,'Usuario de','PRueba','usuario@deprueba.com','$2a$10$G7grnwlrc6E72UvqIMaPSuiCzyVLWjd3NgkTIBpmm.6.La2rNHmEy','user-1633653310988.jpg','client',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-15 13:36:42
