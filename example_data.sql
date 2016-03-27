USE scaleworlddb;

INSERT INTO spacies (id, name, maleImageUrl, maleImageMiniUrl, femaleImageUrl, femaleImageMiniUrl)
	VALUES ('green_dragon', 'Green Dragon', '/imgs/example.jpg', '/imgs/example.jpg', '/imgs/example_mini.jpg', '/imgs/example_mini.jpg');

INSERT INTO monster (id, name, owner, species, gender, birth)
	VALUES (1, 'Kokeshi', 'Kazik2', 'green_dragon', 0, '1992-12-01');
	
INSERT INTO monster (id, name, owner, species, gender, birth)
	VALUES (2, 'Ala', 'Kazik2', 'green_dragon', 0, '1992-12-01');
	
INSERT INTO monster (id, name, owner, species, gender, birth)
	VALUES (3, 'John', 'Kazik2', 'green_dragon', 1, '1992-12-01');