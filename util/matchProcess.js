/* *
* This is a utility class that accepts a start Day and end Day and 
* will make calls for match ids to fill the table. The day will
* automatically begin at 00:00 and the end day will be 23:55.
*
* It is assumed that this is only for URF games during the
* API Challenge so only April's data will be applied
*
* This is a temporary solution to creating a batch job
* */

var fs = require('fs');
var https = require('https');
var config = require('../config/');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var matchesArray = [];

// Connection URL
var dburl = 'mongodb://'+config.mongo.user+':'+config.mongo.pw+'@ds061611.mongolab.com:61611/lolurf';
// connect to the Server
MongoClient.connect(dburl, function(err, db) {
	assert.equal(null, err);
	console.log("Connected to db");
	
	insertMatches(db, function() {
    	db.close();
	});
});

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