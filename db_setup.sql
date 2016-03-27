CREATE DATABASE scaleworlddb;
USE scaleworlddb;

CREATE TABLE spacies (
	id varchar(20),
	name varchar(50),
	maleImageUrl varchar(255),
	maleImageMiniUrl varchar(255),
	femaleImageUrl varchar(255),
	femaleImageMiniUrl varchar(255)
);

CREATE TABLE monster (
	id INTEGER,
	name VARCHAR(50), 
	owner VARCHAR(20), 
	species VARCHAR(20), 
	gender CHAR(1), 
	birth DATE
);