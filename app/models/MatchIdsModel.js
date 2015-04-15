'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MatchIdsSchema = new Schema({
	matchId: Number,
	date: Number,
	batch: Number
},
{
	collection: 'matchIds'
});

mongoose.model('MatchIds', MatchIdsSchema);