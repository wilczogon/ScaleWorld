CREATE DATABASE scaleworlddb;
USE scaleworlddb;

-- add needed functions

DROP FUNCTION IF EXISTS gauss;

DELIMITER $$
CREATE FUNCTION gauss(mean double, stdev double) RETURNS double
BEGIN
set @x=rand(), @y=rand();
set @gaus = ((sqrt(-2*log(@x))*cos(2*pi()*@y))*stdev)+mean;
return @gaus;
END$$
DELIMITER ;

-- create all needed tables

CREATE TABLE species (
	id varchar(20) PRIMARY KEY,
	name varchar(50) NOT NULL,
	active CHAR(1) NOT NULL
);

CREATE TABLE monster (
	id INTEGER PRIMARY KEY,
	name VARCHAR(50), 
	owner VARCHAR(20), 
	species VARCHAR(20) NOT NULL, 
	gender CHAR(1) NOT NULL, 
	birth DATE NOT NULL,
	location VARCHAR(20)
);

CREATE TABLE monsterImage (
	species VARCHAR(20) NOT NULL,
	gender CHAR(1) NOT NULL,
	imageUrl VARCHAR(255) NOT NULL,
	imageMiniUrl VARCHAR(255) NOT NULL,
	PRIMARY KEY(species, gender)
);

CREATE TABLE player (
	name VARCHAR(50) PRIMARY KEY,
	passwordHash VARCHAR(255) NOT NULL,
	emailAddress VARCHAR(255) NOT NULL,
	amountOfGold INTEGER NOT NULL,
	amountOfActionPoints INTEGER NOT NULL
);

CREATE TABLE wilderness (
	id VARCHAR(20) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	active CHAR(1) NOT NULL,
	imageUrl VARCHAR(255) NOT NULL
);

CREATE TABLE habitat (
	species VARCHAR(20) NOT NULL,
	wilderness VARCHAR(20) NOT NULL,
	rarity DOUBLE NOT NULL,
	PRIMARY KEY(species, wilderness)
);

CREATE TABLE itemCategory (
	id VARCHAR(20) PRIMARY KEY,
	name VARCHAR(20) NOT NULL
);

CREATE TABLE item (
	id VARCHAR(20) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	category VARCHAR(20) NOT NULL,
	shopPrice INTEGER NOT NULL,
	imageUrl VARCHAR(255) NOT NULL,
	active CHAR(1) NOT NULL
);

CREATE TABLE inventory (
	item VARCHAR(20) NOT NULL,
	player VARCHAR(50) NOT NULL,
	amount INTEGER NOT NULL,
	PRIMARY KEY(item, player)
);

CREATE TABLE itemAvailability (
	item VARCHAR(20) NOT NULL,
	wilderness VARCHAR(20) NOT NULL,
	rarity DOUBLE NOT NULL,
	foundAmountMean DOUBLE NOT NULL,
	foundAmountDeviation DOUBLE NOT NULL,
	PRIMARY KEY(item, wilderness)
);

-- insert data into tables

INSERT INTO wilderness (id, name, active, imageUrl)
	VALUES ('forest', 'Forest', 1, '/imgs/forest.jpg');
	
-- green dragon

INSERT INTO species (id, name, active)
	VALUES ('green_dragon', 'Green Dragon', 1);
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('green_dragon', 'F', '/imgs/green_dragon_female.jpg', '/imgs/green_dragon_female_mini.jpg');
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('green_dragon', 'M', '/imgs/green_dragon_male.png', '/imgs/green_dragon_male_mini.png');
	
INSERT INTO habitat (species, wilderness, rarity)
	VALUES ('green_dragon', 'forest', 0.4);
	
-- gray dragon
	
INSERT INTO species (id, name, active)
	VALUES ('gray_dragon', 'Gray Dragon', 1);
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('gray_dragon', 'F', '/imgs/gray_dragon_female.png', '/imgs/gray_dragon_female_mini.png');
	
INSERT INTO habitat (species, wilderness, rarity)
	VALUES ('gray_dragon', 'forest', 0.4);
	
-- food
	
INSERT INTO itemCategory (id, name)
	VALUES ('food', 'Food');
	
-- strawberries
	
INSERT INTO item (id, name, category, shopPrice, imageUrl, active)
	VALUES ('strawberry', 'Strawberry', 'food', 1, '/imgs/strawberry.jpg', 1);
	
INSERT INTO itemAvailability (item, wilderness, rarity, foundAmountMean, foundAmountDeviation)
	VALUES ('strawberry', 'forest', 0.3, 6, 3);