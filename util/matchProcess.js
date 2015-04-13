/* *
* The purpose of this program is to persist URF match ids
*
* Albeit this app uses Mongoose, the util was implemented prior to Mongoose Setup
* Hence no .save()
*
* Due to the limitations of the mongo db accepting up to 1000 documents per batch
* Currently manual insertion. If time permits, implement recursion to avoid limit
* */

var https = require('https');
var config = require('../config/config');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');


// Connection URL
var dburi = 'mongodb://'+config.db.user+':'+config.db.pw+'@'+config.db.host+':'+config.db.port+'/'+config.db.db;
// connect to the Server
MongoClient.connect(dburi, function(err, db) {
	assert.equal(null, err);
	console.log("Connected to db");
	
	insertMatches(db, function() {
    	db.close();
	});

});

var matchesArray = [];
var time, start, end;

// for april 1, first record 1427865900000;
// remember to change
start = 1427876400000+300000; //this is the prev end + 5min for next iteration
end = start + (300000*3); // may have to change based on peak hrs
time = start;

	// add 5min per iteration
    for(start; start < end+1; start = start + 300000) {
        // api challenge bucket - GET
        var url = 'https://na.api.pvp.net/api/lol/na/v4.1/game/ids?beginDate=' 
	        + start.toString().substring(0,10) + "&api_key=" + config.api_key;
	        
	   	https.get(url, function (res) {
    	    console.log("Response : " + res.statusCode);
	    	var data = [];    

    		res.on('data', function(bucket) {
    			data += bucket;
	   		});
	   		res.on('end', function() {
	   			if(res.statusCode == 200) {
		   			var obj = JSON.parse(data);
		   			
		   			for(var k = 0; k < obj.length; k++) {
		   				var jsonData = {};
		   				jsonData.gameId = obj[k];
		   				jsonData.date = time;
		   				matchesArray.push(jsonData);
		   				console.log(time + " - " +obj[k]);
		   			}
    			}
    			time = time + 300000;
	   		});

	   	}).on('error', function(e) {
	   	    console.log("Got error: " + e.message);
	   	});
	}

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