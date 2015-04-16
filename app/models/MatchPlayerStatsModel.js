'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MatchPlayerStatsSchema = new Schema ({
	matchId: Number,
	teamId: Number,
	participant: {
		id: Number,
		champId: Number,
		spell1Id: Number,
		spell2Id: Number,
		highestAchievedSeasonTier: String,
		totalDmgTaken: Number,
		pentaKills: Number,
		deaths: Number,
		assists: Number,
		totalDmgDealtToChamps: Number,
		largestKillingSpree: Number,
		minionsKilled: Number,
		goldEarned: Number,
		wardsPlaced: Number,
		killingSprees: Number,
		kills: Number,
		totalHeals: Number
	}
},
{
	collection: 'matchPlayerStats'
});

mongoose.model('MatchPlayerStats', MatchPlayerStatsSchema);