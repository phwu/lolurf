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

var cyc = 2;
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

				insertMatches(matchesArray);
	   		});
	}).on('error', function(e) {
	   	    console.log("Got error: " + e.message);
	});

var insertMatches = function(matchesArray) {
// Connection URL
	var dburi = 'mongodb://'+config.db.user+':'+config.db.pw+'@'+config.db.host+':'+config.db.port+'/'+config.db.db;
	MongoClient.connect(dburi, function(err, db) {
		assert.equal(null, err);
		console.log("Connected to db");

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
						
						// let's create the team/ban docs and push them into their collections
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
							
							var banObjs = teamObjs[i].bans;
							for(var j in banObjs) {
								var ban = {};
								ban.matchId = matchObj.matchId;
								ban.champIdBan = banObjs[j].championId;
//								insertBan(db, ban); 
							}

//							console.log(team);
//							insertTeamStat(db, team);
						} // end Team
						
						// now we'll make player docs and push them into the collection
						var partObjs = matchObj.participants;
						for(var j in partObjs) {
								
							var part = {};
							part.participant = {};
								
							part.matchId = matchObj.matchId;
							part.teamId = partObjs[j].teamId; 
							part.participant.id = partObjs[j].participantId;
							part.participant.champId = partObjs[j].championId;
							part.participant.spell1Id = partObjs[j].spell1Id;
							part.participant.spell2Id = partObjs[j].spell2Id;
							part.participant.highestAchievedSeasonTier = partObjs[j].highestAchievedSeasonTier;
							part.participant.totalDmgTaken = partObjs[j].stats.totalDamageTaken;
							part.participant.pentaKills = partObjs[j].stats.pentaKills;
							part.participant.deaths = partObjs[j].stats.deaths;
							part.participant.assists = partObjs[j].stats.assists;
							part.participant.totalDmgDealtToChamps = partObjs[j].stats.totalDamageDealtToChampions;
							part.participant.largestKillingSpree = partObjs[j].stats.largestKillingSpree;
							part.participant.minionsKilled = partObjs[j].stats.minionsKills;
							part.participant.goldEarned = partObjs[j].stats.goldEarned;
							part.participant.wardsPlaced = partObjs[j].stats.wardsPlaced;
							part.participant.killingSprees = partObjs[j].stats.killingSprees;
							part.participant.kills = partObjs[j].stats.kills;
							part.participant.totalHeals = partObjs[j].stats.totalHeal;
							
							//console.log(part);
							insertPlayerStat(db, part);
						} // end player

					});
				}
			}).on('error', function(e) {
		   	    console.log("Got error: " + e.message);
		   	});	
		}
	});
}

var insertBan= function(db, docs) {
	var matchBansCollection = db.collection('matchBans');
	// Insert bucket data into collection
	matchBansCollection.insert(docs, function(err, result) {
		assert.equal(err, null);
		console.log("data added");
		//callback(result);
	});
}

var insertTeamStat= function(db, docs) {
	var matchTeamStatsCollection = db.collection('matchTeamStats');
	// Insert bucket data into collection
	matchTeamStatsCollection.insert(docs, function(err, result) {
		assert.equal(err, null);
		console.log("data added");
		//callback(result);
	});
}

var insertPlayerStat= function(db, docs) {
	var matchPlayerStatsCollection = db.collection('matchPlayerStats');
	// Insert bucket data into collection
	matchPlayerStatsCollection.insert(docs, function(err, result) {
		assert.equal(err, null);
		console.log("data added");
		//callback(result);
	});
}