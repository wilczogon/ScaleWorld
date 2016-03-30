CREATE DATABASE scaleworlddb;
USE scaleworlddb;

-- create all needed tables

CREATE TABLE species (
	id varchar(20) PRIMARY KEY,
	name varchar(50),
	active CHAR(1)
);

CREATE TABLE monster (
	id INTEGER PRIMARY KEY,
	name VARCHAR(50), 
	owner VARCHAR(20), 
	species VARCHAR(20), 
	gender CHAR(1), 
	birth DATE
);

CREATE TABLE monsterImage (
	species VARCHAR(20) NOT NULL,
	gender CHAR(1) NOT NULL,
	imageUrl VARCHAR(255),
	imageMiniUrl VARCHAR(255),
	PRIMARY KEY(species, gender)
);

CREATE TABLE player (
	name VARCHAR(50) PRIMARY KEY,
	passwordHash VARCHAR(255),
	emailAddress VARCHAR(255),
	amountOfGold INTEGER,
	amountOfActionPoints INTEGER
);

CREATE TABLE wilderness (
	id VARCHAR(20) PRIMARY KEY,
	name VARCHAR(255),
	active CHAR(1),
	imageUrl VARCHAR(255)
);

CREATE TABLE habitat (
	species VARCHAR(20) NOT NULL,
	wilderness VARCHAR(20) NOT NULL,
	rarity INTEGER,
	PRIMARY KEY(species, wilderness)
);

CREATE TABLE itemCategory (
	id VARCHAR(20) PRIMARY KEY,
	name VARCHAR(20)
);

CREATE TABLE item (
	id VARCHAR(20) PRIMARY KEY,
	name VARCHAR(255),
	category VARCHAR(20),
	shopPrice INTEGER,
	imageUrl VARCHAR(255),
	active CHAR(1)
);

CREATE TABLE inventory (
	item VARCHAR(20) NOT NULL,
	player VARCHAR(50) NOT NULL,
	amount INTEGER,
	PRIMARY KEY(item, player)
);

CREATE TABLE itemsAvailability (
	item VARCHAR(20) NOT NULL,
	wilderness VARCHAR(20) NOT NULL,
	rarity DOUBLE,
	foundAmountMean DOUBLE,
	foundAmountDeviation DOUBLE,
	PRIMARY KEY(item, wilderness)
);

-- insert data into tables

INSERT INTO wilderness (id, name, active, imageUrl)
	VALUES ('forest', 'Forest', 1, '/imgs/forest.jpg');

INSERT INTO species (id, name, active)
	VALUES ('green_dragon', 'Green Dragon', 1);
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('green_dragon', 'F', '/imgs/green_dragon_female.jpg', '/imgs/green_dragon_female_mini.jpg');
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('green_dragon', 'M', '/imgs/green_dragon_male.png', '/imgs/green_dragon_male_mini.png');
	
INSERT INTO habitat (species, wilderness, rarity)
	VALUES ('green_dragon', 'forest', 1);
	
INSERT INTO itemCategory (id, name)
	VALUES ('food', 'Food');
	
INSERT INTO item (id, name, category, shopPrice, imageUrl, active)
	VALUES ('strawberry', 'Strawberry', 'food', 1, '/imgs/strawberry.jpg', 1);