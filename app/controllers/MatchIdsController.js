'use strict'

var mongoose = require('mongoose'),
	errorHandler = require('./ErrorsServerController'),
	MatchIds = mongoose.model('MatchIds'),
	_ = require('lodash');

/**
* List the MatchIds
*/
exports.list = function(req, res) {
	MatchIds.find().exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchIds);
		}
	});
};

/**
* List Matches by Date
*/
exports.matchIdsByDate = function(req, res, next, date) {
	MatchIds.find({date: date}).exec(function(err, matchIds) {
		console.log(req);
		if (err) return next(err);
		if (!matchIds) {
			return res.status(404).send({
				message: 'Matches not found'
			});
		}
		req.matchIds = matchIds;
		next();
	});
}