'use strict'

var mongoose = require('mongoose'),
	errorHandler = require('./ErrorsServerController'),
	MatchIds = mongoose.model('MatchIds'),
	_ = require('lodash');

/**
* List the MatchIds by Batch
*/
exports.list = function(req, res) {
	var batch = req.params.batch;
	MatchIds.find({batch: batch}).exec(function(err, matchIds) {
//	MatchIds.find().exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
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
	MatchIds.find({date: date}).exec(function(err, matchIds) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(matchIds);
		}
	});
};

/**
* List Total Matches
*/
exports.totalMatches = function(req, res) {
	MatchIds.count().exec(function(err, matchCount) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(matchCount);
		}
	});
};

/**
* List match count for Date
*/
exports.matchCountByDate = function(req, res) {
	var date = req.params.date;
	MatchIds.count({date: date}).exec(function(err, matchCount) {
		if(err) {
			return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		} else {
			res.json(matchCount);
		}
	});
};