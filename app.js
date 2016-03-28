var express = require('express');
var mustacheExpress = require('mustache-express');
var mysql = require('mysql');
var dbUtils = require('./databaseUtils/mysqlDatabaseUtils');

var app = express();
app.engine('html', mustacheExpress());
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'test',
	password: 'test'
});
connection.connect();

app.set('view engine', 'html');
app.set('views', __dirname + '/html');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index', {
			title: 'Welcome in Scale World!'
        });
    }
);

app.get('/players/:player_id/monsters', function(req, res) {
	var playerId = req.params.player_id;
	dbUtils.getMonstersDataByOwner(connection, playerId, function(monstersData){
		res.render('monsters', {
			title: 'Scale World - ' + playerId + '\'s Monsters',
			monstersData: monstersData,
			returnAvailable: true,
			returnUrl: '/'
		});
	});
});

app.get('/monsters/:monster_id', function(req, res) {
	var monsterId = req.params.monster_id;
	dbUtils.getMonsterDataById(connection, monsterId, function(monsterData){
		res.render('monster', {
			title: 'Scale World - ' + monsterData.name + '\'s Profile',
			imageUrl: monsterData.imageUrl,
            name: monsterData.name,
			species: monsterData.species,
			gender: monsterData.gender,
			age: monsterData.age,
			returnAvailable: true,
			returnUrl: '/players/' + monsterData.owner + '/monsters'
        });
	});
});

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})