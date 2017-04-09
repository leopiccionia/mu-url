const express = require('express');
const app = express();
const body = require('body-parser');

const level = require('level')('./urlbase');
const normalize = require('normalize-url');
const crypto = require('crypto');

app.use(body.urlencoded({extended: true}));

app.get('/', (req, res) => res.sendFile('new.html', {root: __dirname}));

app.post('/', function(req, res){ //TODO
	var url = normalize(req.body.url);
	var hash = crypto.createHash('md5').update(req.body.url).digest('base64').substring(0, 7);
	level.put(hash, url, function(error){
		if(error) throw(error);
	});
	res.send('/' + hash);
});

app.get('/:id([0-9A-Za-z+/]+)', function(req, res){ //TODO
	var key = req.params.id;
	level.get(key, function(error, value){
		if(error)
			return res.status(404).sendFile('not-found.html', {root: __dirname});
		res.redirect(value);
	});
});

app.listen(process.env.PORT, () => console.log(`Reading at port ${process.env.PORT}.`));