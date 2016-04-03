var express = require('express');
var mustacheExpress = require('mustache-express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var dbUtils = require('./databaseUtils/mysqlDatabaseUtils');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var app = express();

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('html', mustacheExpress());
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'test',
	password: 'test'
});

connection.connect();
require('./configureLogin.js')(app, dbUtils, connection);

app.set('view engine', 'html');
app.set('views', __dirname + '/html');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index', {
			title: 'Welcome in Scale World!'
        });
    }
);

app.get('/login', function(req, res) {
	res.render('login', {
			title: 'Please log in',
			message: req.flash('error')[0]
        });
    }
);

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/register', function(req, res) {
	res.render('register', {
			title: 'Registration'
        });
    }
);

app.get('/players/:player_id/monsters', isAuthenticated, function(req, res) {
	var playerId = req.params.player_id;
	dbUtils.getMonstersDataByOwner(connection, playerId, function(monstersData){
		res.render('monsters', {
			user: req.user,
			title: playerId + '\'s Monsters',
			monstersData: monstersData,
			returnAvailable: true,
			returnUrl: '/'
		});
	});
});

app.get('/monsters/:monster_id', isAuthenticated, function(req, res) {
	var monsterId = req.params.monster_id;
	dbUtils.getMonsterDataById(connection, monsterId, function(monsterData){
		res.render('monster', {
			title: monsterData.name + '\'s Profile',
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

app.get('/wildernesses', isAuthenticated, function(req, res) {
	dbUtils.getAvailableWildernesses(connection, function(wildernessesData){
		res.render('wildernesses', {
			title: 'Wildernesses',
			wildernessesData: wildernessesData,
			returnAvailable: true,
			returnUrl: '/'
        });
	});
});

app.get('/wildernesses/:wilderness_id', isAuthenticated, function(req, res) {
	var wildernessId = req.params.wilderness_id;
	dbUtils.getAvailableWildernessById(connection, wildernessId, function(wildernessData){
		res.render('wilderness', {
			title: wildernessData.name,
			id: wildernessId,
			name: wildernessData.name,
			imageUrl: wildernessData.imageUrl,
			returnAvailable: true,
			returnUrl: '/wildernesses'
        });
	});
});

app.post('/wildernesses/:wilderness_id', isAuthenticated, function(req, res) {
	var wildernessId = req.params.wilderness_id;
	var adventureType = req.body.searchType;
	
	if(adventureType == 'searchForMonsters'){
		if(Math.random() <= 0.6){
			dbUtils.getMonsterAdventureResult(connection, wildernessId, function(monsterSearchData){
				res.render('adventure', {
					title: 'Adventure Result',
					adventureType: adventureType,
					monsterSearchData: monsterSearchData,
					returnAvailable: true,
					returnUrl: '/wildernesses'
				});
			});
			return;
		} else{
			dbUtils.getItemAdventureResult(connection, req.user, wildernessId, function(itemSearchData){
				res.render('adventure', {
					title: 'Adventure Result',
					adventureType: adventureType,
					itemSearchData: itemSearchData,
					returnAvailable: true,
					returnUrl: '/wildernesses'
				});
			});
			return;
		}
		/*dbUtils.getMonsterAdventureResult(connection, wildernessId, function(wildernessData){
			res.render('adventure', {
				title: wildernessData.name,
				name: wildernessData.name,
				imageUrl: wildernessData.imageUrl,
				returnAvailable: true,
				returnUrl: '/wildernesses'
			});
		});*/
	} else if(adventureType == 'searchForItems'){
		if(Math.random() <= 0.4){
			dbUtils.getMonsterAdventureResult(connection, wildernessId, function(monsterSearchData){
				res.render('adventure', {
					title: 'Adventure Result',
					adventureType: adventureType,
					monsterSearchData: monsterSearchData,
					returnAvailable: true,
					returnUrl: '/wildernesses'
				});
			});
			return;
		} else{
			dbUtils.getItemAdventureResult(connection, req.user, wildernessId, function(itemSearchData){
				res.render('adventure', {
					title: 'Adventure Result',
					adventureType: adventureType,
					itemSearchData: itemSearchData,
					returnAvailable: true,
					returnUrl: '/wildernesses'
				});
			});
			return;
		}
	} //else if(adventureType == 'trackMetMonster'){
		//TODO
	//}
});

app.get('/inventory', isAuthenticated, function(req, res) {
	dbUtils.getInventory(connection, req.user, function(inventoryData){
		res.render('inventory', {
			title: 'Inventory',
			inventoryData: inventoryData,
			returnAvailable: true,
			returnUrl: '/'
        });
	});
});

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})