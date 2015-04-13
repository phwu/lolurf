'use strict'

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MatchTeamStatsSchema = new Schema({
	match: {
		id: Number,
		duration: Number,
		creation: Number
	},
	team: {
		id: Number,
		towerKills: Number,
		dragonKills: Number,
		baronKills: Number
	}
});

mongoose.model('MatchTeamStats', MatchTeamStatsSchema);