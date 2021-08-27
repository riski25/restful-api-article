/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.4.8-MariaDB : Database - db_artikel
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `artikels` */

CREATE TABLE `artikels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `artikels` */

LOCK TABLES `artikels` WRITE;

insert  into `artikels`(`id`,`title`,`description`,`image`,`createdAt`,`updatedAt`) values (1,'psbb','pembatasan sosial','favicon.png','2021-08-27 14:04:56','2021-08-27 15:32:03');
insert  into `artikels`(`id`,`title`,`description`,`image`,`createdAt`,`updatedAt`) values (2,'penyakit','penyakit corona','img-artike1.jpg','2021-08-27 14:05:32','2021-08-27 14:05:32');
insert  into `artikels`(`id`,`title`,`description`,`image`,`createdAt`,`updatedAt`) values (4,'sehat','olahraga sehat','','2021-08-27 15:49:13','2021-08-27 15:49:13');

UNLOCK TABLES;

/*Table structure for table `users` */

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `jeniskelamin` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `akses` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

LOCK TABLES `users` WRITE;

insert  into `users`(`id`,`email`,`username`,`password`,`nama`,`alamat`,`jeniskelamin`,`foto`,`akses`,`createdAt`,`updatedAt`) values (1,'samsul@gmail.com','samsul','$2a$08$p9eMcgZiF3g4RyIMnqnjSuv/SldUbORhw3fExjx9MQmHtthyJmwri','namasamsul','alamatsamsul','P','img.jpg','user','2021-08-27 11:41:33','2021-08-27 11:41:33');
insert  into `users`(`id`,`email`,`username`,`password`,`nama`,`alamat`,`jeniskelamin`,`foto`,`akses`,`createdAt`,`updatedAt`) values (2,'susi@gmail.com','susi','$2a$08$y9nYS1eFtwgny7JYy1Qtl.QwfC6qU50RuTddkVA9Ru.uEfmnOLw/e','namasamsul','alamatsamsul','P','img.jpg','user','2021-08-27 11:43:54','2021-08-27 11:43:54');
insert  into `users`(`id`,`email`,`username`,`password`,`nama`,`alamat`,`jeniskelamin`,`foto`,`akses`,`createdAt`,`updatedAt`) values (3,'toni@gmail.com','toni','$2a$08$TSVmCZ3kRtgdXkN1FycxYeVJldAnMN9ISGLlLziEkl7Vvxjcn7b0S','andi1','alamatrandi','L','img.jpg','penulis','2021-08-27 11:57:36','2021-08-27 13:18:04');
insert  into `users`(`id`,`email`,`username`,`password`,`nama`,`alamat`,`jeniskelamin`,`foto`,`akses`,`createdAt`,`updatedAt`) values (4,'randi@gmail.com','randi','$2a$08$ymoTiYGaQVv0QQX4yAk9L.wL.i3do3i6OO3/TZxAo1F78I5u3oaI2','namarandi','alamatrandi','L','img.jpg','penulis','2021-08-27 12:18:49','2021-08-27 12:18:49');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
