var express = require('express');
var app = express();
var request = require('request');
var apiUrl = 'https://api.instagram.com/v1/tags/selfie/media/recent?access_token=31053992.f59def8.1ec14fa313984721b77ca9067d0c40ef'; 
var mongoose = require('mongoose'); 		
//
//connect to local mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/selfies');

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		
	app.use(express.logger('dev')); 						
	app.use(express.bodyParser()); 							
	app.use(express.methodOverride()); 						
});

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});

app.get('/selfie', function(req, res){
	request( apiUrl , function (error, response, body) {
	  if (!error && response.statusCode == 200) { 
	    res.send(body)
	  }

	});
});

var Selfie = mongoose.model('Selfie', {
		url : String,
		numYes: Number, 
		numNo: Number,
		notASelfie: Number
});

app.post('/selfie/vote', function(req, res){
	console.log(req.body); 
	Selfie.create({
		url : req.body.url,
		numYes : req.body.numYes,
		numNo : req.body.numNo,
		notASelfie : req.body.notASelfie
	}, function ( err, selfie){
		if(err)
			console.log(err); 
	}); 
}); 

app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
});





app.listen(3000);
console.log('Listening on port 3000');