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
exports.matchIdsByDate = function(req, res) {
	var date = req.params.date;
	console.log(req.params.date);
	MatchIds.find({date: date}).exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchIds);
		}
	});
};

exports.totalMatches = function(req, res) {
	MatchIds.count().exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchIds);
		}
	});
};

exports.matchCountByDate = function(req, res) {
	var date = req.params.date;
	console.log(req.params.date);
	MatchIds.count({date: date}).exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMEssage(err)});
		} else {
			res.json(matchIds);
		}
	});
};