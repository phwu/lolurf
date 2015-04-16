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
* Use for kills, gold, wards, etc.
*/
exports.getObj = function(req,res) {
	var obj = req.params.obj;
	MatchPlayerStats
		.aggregate()
		.group(
			{ 
				_id: null, 
				total: {$sum: '$participant.'+obj},
				avg: {$avg: '$participant.'+obj},
				min: {$min: '$participant.'+obj},
				max: {$max: '$participant.'+obj}
			}
		)
		.exec(function(err, o) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(o);
			}
	});
};

/**
* Ideally used for champId and highestTitle
*/
exports.sc = function(req, res) {
	var sc = req.params.sc;
	MatchPlayerStats
		.aggregate()
		.group(
			{ 
				_id: '$participant.sc', 
				playerCount: {$sum: 1}
			}
		)
		.exec(function(err, o) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(o);
			}
	});
}

