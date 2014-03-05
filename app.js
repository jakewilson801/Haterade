var express = require('express');
var app = express();
var request = require('request');
var apiUrl = 'https://api.instagram.com/v1/tags/selfie/media/recent?access_token=31053992.f59def8.1ec14fa313984721b77ca9067d0c40ef'; 


app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

app.get('/selfie', function(req, res){
	request( apiUrl , function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) 
	    res.send(body)
	  }

	})
});

app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});



app.listen(3000);
console.log('Listening on port 3000');