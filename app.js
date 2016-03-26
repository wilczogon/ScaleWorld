var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express();
app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', __dirname + '/html');
app.use(express.static('public'));

app.get('/monsters/:monster_id', function(req, res) {
    res.render('monster', {
			pictureUrl: '',
            name: 'Kokeshi',
			race: 'Dragon',
			gender: 'Female',
			age: '3 years'
        });
    });

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})