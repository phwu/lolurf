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
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(matchBans);
		}
	});
};

/**
* Gimme the count of bans!
*/
exports.totalBans = function(req, res) {
	MatchBans.count().exec(function(err, bansCount) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(bansCount);
		}
	});
};

/**
 * Ban counts for all champs, in desc order
 */
exports.bansCountAll = function(req, res) {
	MatchBans
	.aggregate()
	.group(
		{
			_id: '$champIdBan',
			totalBans: {$sum: 1}
		}	
	)
	.sort({totalBans: -1})
	.exec(function(err, bansCount) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(bansCount);
		}
	});
}

/**
* Gimme the count of bans for champId -- NOT WORKING
*/
exports.bansChampId = function(req, res) {
	var champId = req.params.champId;
	console.log(champId);
	MatchBans
	.aggregate()
	.match({ champIdBan: champId })
	.group(
		{
			_id: null,
			totalBans: {$sum: 1}
		}
	)
	.exec(function(err, bansCount) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(bansCount);
		}
	});
};

