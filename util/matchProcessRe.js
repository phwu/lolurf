/**
 * The purpose of this utility class is to take the match ids retreieved from the api-challenge endpoint
 * and persist the match data into the applications own backend. This would avoid the limitation
 * of being restricted to X calls per Y minutes.
 * 
 * The utility currently is coded in a way that it will loop through the batch cycles that the 
 * match ids were retreieved in and process the match data from Riot's API. 
 * 
 */

var https = require('https');
var config = require('../config/config');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
	var dburi = 'mongodb://'+config.db.user+':'+config.db.pw+'@'+config.db.host+':'+config.db.port+'/'+config.db.db;
	MongoClient.connect(dburi, function(err, db) {
		assert.equal(null, err);
		console.log("Connected to db");
		
		
		var time, start, end;
		
		// for april 1, first record 1427865900000;
		// remember to change
		start = 1427880600000 + 300000; //this is the prev end + 5min for next iteration
		end = start + (300000*4); 
		time = start;
		
		for (start; start < end+1; start = start+300000) {
			var matchesUrl = 'https://na.api.pvp.net/api/lol/na/v4.1/game/ids?beginDate=' 
			        + start.toString().substring(0,10) + "&api_key=" + config.api_key;
		
			   	https.get(matchesUrl, function (res) {
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
				   				jsonData.matchId = obj[k];
				   				jsonData.date = time;
				   				jsonData.batch = 3;
				   				//insertMatchId(db, jsonData);
				   				
				   				console.log(jsonData);
				   			}
		    			}
		    			time = time + 300000;
			   		});
		
			   	}).on('error', function(e) {
			   	    console.log("Got error: " + e.message);
			   	});
			
		}
	});


var insertMatchId= function(db, docs) {
	var matchIdsCollection = db.collection('matchIds');
	// Insert bucket data into collection
	matchIdsCollection.insert(docs, function(err, result) {
		assert.equal(err, null);
		console.log("data added");
		//callback(result);
	});
};
