'use strict'

var mongoose = require('mongoose'),
	errorHandler = require('./ErrorsServerController'),
	MatchPlayerStats = mongoose.model('MatchPlayerStats'),
	_ = require('lodash');

/**
* List the player stats for URF matches (no summoner Ids provided)
*/
exports.list = function(req, res) {
	MatchPlayerStats.find().exec(function(err, matchPlayerStats) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(matchPlayerStats);
		}
	});
};

/**
* kill stats for :objKills for all matches
*/
exports.objKills = function(req,res) {
	var objKills = req.params.objKills;
	MatchPlayerStats
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
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(kills);
			}
	});
};

/**
* duration time stats for all matches
*/
exports.duration = function(req, res) {
	MatchPlayerStats
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
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(kills);
			}
	});
}
