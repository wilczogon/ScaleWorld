var express = require('express');
var mustacheExpress = require('mustache-express');
var mysql = require('mysql');

var app = express();
app.engine('html', mustacheExpress());
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: 'wilczogon7'
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

app.get('/monsters', function(req, res) {
	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
		if (err) throw err;
		console.log('The solution is: ', rows[0].solution);
	}
);
	
    res.render('monsters', {
			title: 'Scale World - Kazik\'s Monsters',
			playerName: 'Kazik2',
			monstersData: [
				{
					id: 1,
					name: 'Kokeshi',
					pictureUrl: '/imgs/example_mini.jpg'
				},
				{
					id: 2,
					name: 'Ala',
					pictureUrl: '/imgs/example_mini.jpg'
				},
				{
					id: 3,
					name: 'John',
					pictureUrl: '/imgs/example_mini.jpg'
				}
			],
			returnAvailable: true,
			returnUrl: '/'
        });
    }
);

app.get('/monsters/:monster_id', function(req, res) {
	var monsterId = req.params.monster_id;
	//TODO add operations on database
	
    res.render('monster', {
			title: 'Scale World - Kokeshi\'s Profile',
			pictureUrl: '/imgs/example.jpg',
            name: 'Kokeshi',
			race: 'Green Dragon',
			gender: 'Female',
			age: '3 years',
			returnAvailable: true,
			returnUrl: '/monsters'
        });
    }
);

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})