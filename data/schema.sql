### Schema

CREATE DATABASE tvfriendfinder;

USE tvfriendfinder;

CREATE TABLE shows (
	id int NOT NULL AUTO_INCREMENT,
	show_name varchar(50) NOT NULL,
    score varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(30) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    score varchar(30) NOT NULL,
    show_name VARCHAR(50),
	PRIMARY KEY (id)
);