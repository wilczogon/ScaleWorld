
module.exports = {
	getMonsterDataById: function(connection, monsterId, callback) {
		connection.query('SELECT name, (select sp.name from scaleworlddb.species sp where sp.id = mon.species) as species, gender, TIMESTAMPDIFF(YEAR, birth, CURDATE()) as age, owner, (select imageUrl from scaleworlddb.monsterImage mi where mi.species = mon.species and mi.gender = mon.gender) as imageUrl FROM scaleworlddb.monster mon WHERE id = ' + monsterId, function(err, rows, fields) { //TODO %d
			if(err) throw err;
			callback(rows[0]);
		});
	},
	
	getMonstersDataByOwner: function(connection, playerId, callback) {
		connection.query('SELECT id, name, (select imageMiniUrl from scaleworlddb.monsterImage mi where mi.species = mon.species and mi.gender = mon.gender) as imageMiniUrl FROM scaleworlddb.monster mon WHERE owner = \'' + playerId + '\'', function(err, rows, fields) { //TODO %d
			if(err) throw err;
			callback(rows);
		});
	}
};