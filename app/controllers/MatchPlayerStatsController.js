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
				_id: '$teamId', 
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
 *  Used to get row count for participant item
* Ideally used for champId, highestTitle, spell Ids
*/
exports.sc = function(req, res) {
	var sc = req.params.sc;
	MatchPlayerStats
		.aggregate()
		.group(
			{ 
				_id: '$participant.' + sc, 
				count: {$sum: 1}
			}
		)
		.sort({ count: -1})
		.exec(function(err, o) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(o);
			}
	});
}

// sort by "participant.spell2Id": 1, "_id": 1 for spell order by id
exports.spell1Ids = function(req, res) {
	MatchPlayerStats
		.aggregate()
		.group(
			{ 
				_id: '$participant.spell1Id', 
				count: {$sum: 1}
			}
		)
		.sort({ "count": -1 })
		.exec(function(err, o) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(o);
			}
	});
}

exports.spell2Ids = function(req, res) {
	MatchPlayerStats
		.aggregate()
		.group(
			{ 
				_id: '$participant.spell2Id', 
				count: {$sum: 1}
			}
		)
		.sort({ "count": -1 })
		.exec(function(err, o) {
			if(err) {
				return res.status(400).send({message: errorHandler.getErrorMessage(err)});
			} else {
				res.json(o);
			}
	});
}
