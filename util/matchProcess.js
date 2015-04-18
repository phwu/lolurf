// /* *
// * The purpose of this program is to persist URF match ids from api-challenge
// *
// * Albeit this app uses Mongoose, the util was implemented prior to Mongoose Setup
// * Hence no .save()
// *
// * Wrote this program first, did not realize that mongodb has a 1k row limit.
// * Currently populated manually due to time constraints
// * */

// var https = require('https');
// var config = require('../config/config');
// var MongoClient = require('mongodb').MongoClient,
// 	assert = require('assert');
	
	
// // Connection URL
// var dburi = 'mongodb://'+config.db.user+':'+config.db.pw+'@'+config.db.host+':'+config.db.port+'/'+config.db.db;
// // connect to the Server
// MongoClient.connect(dburi, function(err, db) {
// 	assert.equal(null, err);
// 	console.log("Connected to db");
	
// 	insertMatches(db, function() {
//     	db.close();
// 	});

// });


// var insertMatches = function(db, callback) {
// 	// Get matchIds collection
// 	var collection = db.collection('matchIds');
// 	var bulk = collection.initializeOrderedBulkOp();
// 	// Insert bucket data into collection
// 	collection.insert(matchesArray, function(err, result) {
// 		assert.equal(err, null);
// 		console.log("data added");
// 		callback(result);
// 	});
// }


// var matchesArray = [];
// var time, start, end;

// // for april 1, first record 1427865900000;
// // remember to change
// start = 1427880600000 + 300000; //this is the prev end + 5min for next iteration
// end = start + (300000*4); 
// time = start;

// 	// add 5min per iteration
//     for(start; start < end+1; start = start + 300000) {
//         // api challenge bucket - GET
//         var url = 'https://na.api.pvp.net/api/lol/na/v4.1/game/ids?beginDate=' 
// 	        + start.toString().substring(0,10) + "&api_key=" + config.api_key;
	        
// 	   	https.get(url, function (res) {
//     	    console.log("Response : " + res.statusCode);
// 	    	var data = [];    

//     		res.on('data', function(bucket) {
//     			data += bucket;
// 	   		});
// 	   		res.on('end', function() {
// 	   			if(res.statusCode == 200) {
// 		   			var obj = JSON.parse(data);
		   			
// 		   			for(var k = 0; k < obj.length; k++) {
// 		   				var jsonData = {};
// 		   				jsonData.matchId = obj[k];
// 		   				jsonData.date = time;
// 		   				jsonData.batch = 3;
// 		   				matchesArray.push(jsonData);
// 		   				console.log(time + " - " +obj[k]);
// 		   			}
//     			}
//     			time = time + 300000;
// 	   		});

// 	   	}).on('error', function(e) {
// 	   	    console.log("Got error: " + e.message);
// 	   	});
// 	}
	
