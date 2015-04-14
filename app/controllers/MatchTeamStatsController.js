'use strict'

var mongoose = require('mongoose'),
	errorHandler = require('./ErrorsServerController'),
	MatchTeamStats = mongoose.model('MatchTeamStats'),
	_ = require('lodash');

/**
* List the team stats
*/
exports.list = function(req, res) {
	MatchTeamStats.find().exec(function(err, matchTeamStats) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchTeamStats);
		}
	});
};

/**
* kill stats for :objKills for all matches
*/
exports.objKills = function(req,res) {
	var objKills = req.params.objKills;
	MatchTeamStats
		.aggregate()
		.group(
			{ 
				_id: null, 
				totalKills: {$sum: '$team.'+objKills},
				avgKills: {$avg: '$team.'+objKills},
				minKills: {$min: '$team.'+objKills},
				maxKills: {$max: '$team.'+objKills}
			}
		)
		.exec(function(err, kills) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
			} else {
				res.json(kills);
			}
	});
};

/**
* duration time stats for all matches
*/
exports.duration = function(req, res) {
	MatchTeamStats
		.aggregate()
		.group(
			{ 
				_id: null, 
				totalDuration: {$sum: { $divide: ['$match.duration', 2] }},
				avgDuration: {$avg: '$match.duration'},
				minDuration: {$min: '$match.duration'},
				maxDuration: {$max: '$match.duration'}
			}
		)
		.exec(function(err, kills) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
			} else {
				res.json(kills);
			}
	});
}
