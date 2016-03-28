CREATE DATABASE scaleworlddb;
USE scaleworlddb;

-- create all needed tables

CREATE TABLE species (
	id varchar(20),
	name varchar(50),
	active CHAR(1)
);

CREATE TABLE monster (
	id INTEGER,
	name VARCHAR(50), 
	owner VARCHAR(20), 
	species VARCHAR(20), 
	gender CHAR(1), 
	birth DATE
);

CREATE TABLE monsterImage (
	species VARCHAR(20),
	gender CHAR(1),
	imageUrl VARCHAR(255),
	imageMiniUrl VARCHAR(255)
);

CREATE TABLE player (
	id INTEGER,
	passwordHash VARCHAR(255),
	emailAddress VARCHAR(255),
	amountOfGold INTEGER,
	amountOfActionPoints INTEGER
);

CREATE TABLE wilderness (
	id varchar(20),
	name VARCHAR(255),
	active CHAR(1),
	imageUrl VARCHAR(255)
);

CREATE TABLE habitat (
	species varchar(20),
	wilderness varchar(20),
	rarity INTEGER
);

-- insert data into tables

INSERT INTO wilderness (id, name, active, imageUrl)
	VALUES ('forest', 'Forest', 1, '');

INSERT INTO species (id, name, active)
	VALUES ('green_dragon', 'Green Dragon', 1);
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('green_dragon', 'F', '/imgs/green_dragon_female.jpg', '/imgs/green_dragon_female_mini.jpg');
	
INSERT INTO monsterImage (species, gender, imageUrl, imageMiniUrl)
	VALUES ('green_dragon', 'M', '/imgs/green_dragon_male.png', '/imgs/green_dragon_male_mini.png');
	
INSERT INTO habitat (species, wilderness, rarity)
	values ('green_dragon', 'forest', 1);