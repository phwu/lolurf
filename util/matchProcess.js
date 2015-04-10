/* *
Due to the limitations of the mongo db accepting up to 1000 documents per batch
the util class will accept time in Long type to process (insert into db collection)
* */

var fs = require('fs');
var https = require('https');
var config = require('../config/');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
/*var mongoose = require('mongoose');
var uriUtil= require('mongoose-uri');

var options = {
	server: {
		socketOptions: {
			keepAlive: 1,
			connectTimeOutMS: 30000
		}
	},
	replset: {
		socketOptions: {
			keepAlive: 1,
			connectTimeoutMS: 30000
		}
	}
};

var mongodbUri = 'mongodb://'+config.mongo.user+':'+config.mongo.pw+'@'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	
	// game schema
	var gameSchema = mongoose.Schema({
		gameId: Number,
		date: Number
	});
	
	// store match document in a matchIds collectin
	var Game = mongoose.model('games', gameSchema);
	
	
});*/


// Connection URL
var dburl = 'mongodb://'+config.mongo.user+':'+config.mongo.pw+'@'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db;
// connect to the Server
MongoClient.connect(dburl, function(err, db) {
	assert.equal(null, err);
	console.log("Connected to db");
	
	insertMatches(db, function() {
    	db.close();
	});
});

var matchesArray = [];
var start = process.argv[2];
var end = process.argv[3];
start = 1427873700000;
end = 1427873700000;
var time = start;
	
//fs.readFile('../etc/passwd', function (err, data) {
//    if (err) throw err;
	
	// for april 1, first record
	//var startLong = 1427865900000;

	// add 5min per iteration
    for(start; start <= end; start = start + 300000) {
        // api challenge bucket - GET
        var url = 'https://na.api.pvp.net/api/lol/na/v4.1/game/ids?beginDate=' 
	        + start.toString().substring(0,10) + "&api_key=" + config.api_key;
	        
	   	https.get(url, function (res) {
    	    console.log("Response : " + res.statusCode);
	    	    
    		res.on('data', function(bucket) {
    			// only add if valid response
    			if(res.statusCode == 200) {
		   			var obj = JSON.parse(bucket);
		   			
		   			for(var k = 0; k < obj.length; k++) {
		   				var jsonData = {};
		   				jsonData.gameId = obj[k];
		   				jsonData.date = time;
		   				//matchesArray.push(jsonData);
		   				console.log(time + " - " +obj[k]);
		   			}
    			}
    			time = time + 300000;
	   		});
	   	}).on('error', function(e) {
	   	    console.log("Got error: " + e.message);
	   	});
	}
//});

var insertMatches = function(db, callback) {
	// Get matchIds collection
	var collection = db.collection('matchIds');
	// Insert bucket data into collection
	collection.insert(matchesArray, function(err, result) {
		assert.equal(err, null);
		console.log("data added");
		callback(result);
	});
}