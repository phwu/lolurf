/* *
* The purpose of this program is to persist URF match data from match
*
* Albeit this app uses Mongoose, I decided I only wanted the utils to be writing to the db
* Hence no POST/UPDATE/CREATE/INSERT
*
* Due to the limitations of the mongo db accepting up to 1000 documents per batch
* inserting document 1 at a time
* */

var https = require('https');
var config = require('../config/config');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');


// cycle through the batches
for(var cyc = 1; cyc < 10; cyc++) {

	// these arrays will hold the 'new' jsons 
	// will hold the documents to insert into collections
	var teamDocs = [];	// should have 2
	var banDocs = [];	// should have 6
	var partDocs = [];	// should have 10

	var matchesUrl = 'https://lolurf-phwu-1.c9.io/matches/'+cyc;

	https.get(matchesUrl, function (res) {
    	    console.log("Response : " + res.statusCode);
			var data = [];
    		res.on('data', function(matchList) {
    			data += matchList;
	   		});
	   		res.on('end', function() {
	   			// manage matchIds to pull for match api
				var matchesArray = [];
	   			var parsedData = JSON.parse(data);
	   			
	   			for (var i = 0; i < parsedData.length; i++) {
	   				var obj = parsedData[i];
	   				//console.log(obj.matchId);
				    matchesArray.push(obj.matchId);
				}
				
				insertMatchStats(matchesArray);
				
	   		});
	}).on('error', function(e) {
	   	    console.log("Got error: " + e.message);
	});

	var insertMatchStats = function(matchesArray) {
		// for every match from batch cyc in matchesArray
		for (var id in matchesArray) {
			
			// get match id's stats from Riot's Match API
			var riotUrl = 'https://na.api.pvp.net/api/lol/na/v2.2/match/'
				+matchesArray[id]+'?api_key='+config.api_key;
			
			https.get(riotUrl, function(res) {
				if(res.statusCode == 200) {
					var s=[];
					
					res.on('data', function(match) {
						// assign response (comes in buffers)
						s += match;
					});
					res.on('end', function() {
						// parse the json so you can take the values
						// these vars will hold the json objects
						var matchObj = JSON.parse(s);
						var teamObjs = matchObj.teams;
						var partObjs = matchObj.participants;
						
						// let's create the team/ban docs and push them into the arrays
						for(var i in teamObjs){
							// match the MatchTeamStats Model
							var team = {};
							team.match = {};
							team.team = {};
							
							team.match.id = matchObj.matchId;
							team.match.duration = matchObj.matchDuration;
							team.match.creation = matchObj.matchCreation;
							team.team.id = teamObjs[i].teamId;
							team.team.towerKills = teamObjs[i].towerKills;
							team.team.dragonKills = teamObjs[i].dragonKills;
							team.team.baronKills = teamObjs[i].baronKills;
							teamDocs.push(team);
							
							var banObjs = teamObjs[i].bans;
							for(var j in banObjs) {
								var ban = {};
								ban.matchId = matchObj.matchId;
								ban.champIdBan = banObjs[j].championId;
								banDocs.push(ban);
							}
						}		
						
						//assign the values to fields within respective doc templates
						//console.log(banDocs);
						//console.log(teamDocs);
						//console.log(partDocs);

					});
				}
			}).on('error', function(e) {
		   	    console.log("Got error: " + e.message);
		   	});	
		   	
			// insert into respective collections & repeat
			break;
		}
	}
	
	// Connection URL
	var dburi = 'mongodb://'+config.db.user+':'+config.db.pw+'@'+config.db.host+':'+config.db.port+'/'+config.db.db;
	// connect to the Server
	MongoClient.connect(dburi, function(err, db) {
		assert.equal(null, err);
		console.log("Connected to db");
		
		// establish collections to b e used
		var matchTeamStatsCollection = db.collection('matchTeamStats');
		var matchBansCollection = db.collection('matchBans');
		//var matchPlayerStatsCollection = db.collection('matchTeamStats');
		
		//var bulk = collection.initializeOrderedBulkOp();
		
/*		matchBansCollection.insert(banDocs, function(err, result) {
			assert.equal(err, null);
			console.log("data added");
		});*/
		insertBans(db, function() {
					db.close();
		});
		
/*		matchTeamStatsCollection.insert(teamDocs, function(err, result) {
			assert.equal(err, null);
			console.log("data added");
		});*/
	

	});
	break;

}
	   	
var insertBans = function(db, callback) {
	var matchBansCollection = db.collection('matchBans');
	// Insert bucket data into collection
	matchBansCollection.insert(banDocs, function(err, result) {
		assert.equal(err, null);
		console.log("data added");
		callback(result);
	});
}