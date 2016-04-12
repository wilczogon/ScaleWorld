util = require('util');

module.exports = {
	addUser: function(connection, nickname, passwordHash, emailAddress, gender, callback) {
		connection.query(
			util.format(
				'INSERT INTO scaleworlddb.player (name, passwordHash, emailAddress, gender, amountOfGold, amountOfActionPoints, location) ' +
				'VALUES (\'%s\', \'%s\', \'%s\', \'%s\', %d, %d);', nickname, passwordHash, emailAddress, gender, 200, 10, 'middle_europe'),
			function(err, rows, fields) {
				if(err) throw err;
				callback();
			}
		);
	},

	getUser: function(connection, playerId, callback) {
		connection.query(
			util.format(
				'SELECT name as username, passwordHash as password, amountOfGold, amountOfActionPoints, (select name from scaleworlddb.land where id=location) as location from scaleworlddb.player where name=\'%s\';', playerId),
			function(err, rows, fields) {
			if(err) throw err;
			if(rows.length > 0)
				callback(rows[0]);
			else
				callback(null);
		});
	},
	
	getUserInfo: function(connection, playerId, callback) {
		connection.query(
			util.format(
				'SELECT name as username, gender, amountOfGold, amountOfActionPoints, (select name from scaleworlddb.land where id=location) as location from scaleworlddb.player where name=\'%s\';', playerId),
			function(err, rows, fields) {
			if(err) throw err;
			if(rows.length > 0)
				callback(rows[0]);
			else
				callback(null);
		});
	},
	
	getMonsterDataById: function(connection, monsterId, callback) {
		connection.query(
			util.format(
				'SELECT name, (select sp.name from scaleworlddb.species sp where sp.id = mon.species) as species, gender, TIMESTAMPDIFF(YEAR, birth, CURDATE()) as age, owner, (select imageUrl from scaleworlddb.monsterImage mi where mi.species = mon.species and mi.gender = mon.gender) as imageUrl FROM scaleworlddb.monster mon WHERE id = %d;', monsterId),
			function(err, rows, fields) {
			if(err) throw err;
			callback(rows[0]);
		});
	},
	
	getMonstersDataByOwner: function(connection, playerId, callback) {
		connection.query(
			util.format('SELECT id, name, (select imageMiniUrl from scaleworlddb.monsterImage mi where mi.species = mon.species and mi.gender = mon.gender) as imageMiniUrl FROM scaleworlddb.monster mon WHERE owner = \'%s\';', playerId),
			function(err, rows, fields) {
			if(err) throw err;
			callback(rows);
		});
	},
	
	getAvailableWildernesses: function(connection, callback) {
		connection.query('select id, name from scaleworlddb.wilderness wild where active = 1;', function(err, rows, fields) {
			if(err) throw err;
			callback(rows);
		});
	},
	
	getAvailableWildernessById: function(connection, wildernessId, callback) {
		connection.query(
			util.format('select name, imageUrl from scaleworlddb.wilderness wild where active = 1 and id = \'%s\';', wildernessId),
			function(err, rows, fields) {
			if(err) throw err;
			callback(rows[0]);
		});
	},
	
	getInventory: function(connection, playerId, callback) {
		connection.query(
			util.format(
				'select inv.item, item.name, item.category, item.imageUrl, inv.amount from scaleworlddb.inventory inv ' +
				'join scaleworlddb.item item on inv.item = item.id ' +
				'where inv.player = \'%s\';', playerId),
			function(err, rows, fields) {
			if(err) throw err;
			callback(rows);
		});
	},
	
	getMonsterAdventureResult: function(connection, wildernessId, callback) {
		connection.query(
			util.format(
				'select mon.name, (select name from scaleworlddb.species sp where sp.id=mon.species) as species, mon.gender, TIMESTAMPDIFF(YEAR, mon.birth, CURDATE()) as age, (select imageUrl from scaleworlddb.monsterImage mi where mi.species = mon.species and mi.gender = mon.gender) as imageUrl from scaleworlddb.monster mon ' +
				'join scaleworlddb.habitat hab on hab.species = mon.species ' +
				'where mon.location=\'%s\' and hab.rarity >= rand() ' +
				'order by rand() limit 1;', wildernessId),
			function(err, rows, fields) {
			if(err) throw err;
			callback(rows[0]);
		});
	},
	
	getItemAdventureResult: function(connection, playerId, wildernessId, callback) {
		connection.query(
			util.format(
				'select item.id, item.name, item.imageUrl, greatest(1, floor(scaleworlddb.gauss(iav.foundAmountMean, iav.foundAmountDeviation))) as amount from scaleworlddb.itemAvailability iav ' +
				'join scaleworlddb.item item on item.id=iav.item ' +
				'where iav.wilderness = \'%s\' and iav.rarity >= rand();', wildernessId),
			function(err, rows, fields) {
				if(err) throw err;
				rows.forEach(function(element, index, array){
					addItems(connection, playerId, element.id, element.amount);
				});
				callback(rows);
		});
	},
};

function addItems(connection, playerId, item, amount) {
	connection.query(
		util.format('select amount from scaleworlddb.inventory where player=\'%s\' and item=\'%s\'', playerId, item),
		function(err, rows, fields){
			if(err) throw err;
			if(rows.length <= 0){
				connection.query(
					util.format(
						'insert into scaleworlddb.inventory (item, player, amount) ' +
						'values (\'%s\', \'%s\', %d);', item, playerId, amount),
					function(err, rows, fields) {
						if(err) throw err;
					}
				);
			} else{
				connection.query(
					util.format(
						'update scaleworlddb.inventory set amount=%d ' +
						'where item=\'%s\' and player=\'%s\';', amount + rows[0].amount, item, playerId),
					function(err, rows, fields) {
						if(err) throw err;
					}
				);
			}
		}
	);
}