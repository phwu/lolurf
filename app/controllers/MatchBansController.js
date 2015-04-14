'use strict'

var mongoose = require('mongoose'),
	errorHandler = require('./ErrorsServerController'),
	MatchBans = mongoose.model('MatchBans'),
	_ = require('lodash');

/**
* List the bans
*/
exports.list = function(req, res) {
	MatchBans.find().exec(function(err, matchBans) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchBans);
		}
	});
};

/**
* List bans by match Id
*/
exports.bansByMatchId = function(req, res) {
	var matchId = req.params.matchId;
	MatchBans.find({matchId: matchId}).exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchIds);
		}
	});
};

/**
* Gimme the count of bans!
*/
exports.totalBans = function(req, res) {
	MatchBans.count().exec(function(err, bansCount) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(bansCount);
		}
	});
};
