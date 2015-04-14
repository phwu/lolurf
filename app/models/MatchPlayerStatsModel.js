'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var matchPlayerStatsSchema = new Schema ({
	matchId: Number,
	teamId: Number,
	participant: {
		id: Number,
		champ: String,
		spell1: String,
		spell2: String,
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
});

mongoose.model('MatchPlayerStats', MatchPlayerStatsSchema);