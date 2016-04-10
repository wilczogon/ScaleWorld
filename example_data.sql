USE scaleworlddb;

INSERT INTO monster (id, name, owner, species, gender, birth)
	VALUES (1, 'Kokeshi', 'Kokeshi', 'gray_dragon', 'F', '1992-12-01');
	
INSERT INTO monster (id, name, owner, species, gender, birth)
	VALUES (4, 'George', null, 'gray_dragon', 'M', '1992-12-01');
	
INSERT INTO monster (id, name, owner, species, gender, birth, location)
	VALUES (2, 'Ala', null, 'green_dragon', 'F', '1992-12-01', 'forest');
	
INSERT INTO monster (id, name, owner, species, gender, birth, location)
	VALUES (3, 'John', null, 'green_dragon', 'M', '1992-12-01', 'forest');
	
INSERT INTO inventory (item, player, amount)
	VALUES ('strawberry', 'Kazik2', 5);
	
INSERT INTO player (name, passwordHash, emailAddress, gender, amountOfGold, amountOfActionPoints)
	VALUES ('Kazik2', 'test', 'kazik2@gmail.com', 'M', 200, 10);
	
INSERT INTO player (name, passwordHash, emailAddress, gender, amountOfGold, amountOfActionPoints)
	VALUES ('Kokeshi', 'test', 'kokeshi@gmail.com', 'F', 200, 10);