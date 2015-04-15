'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MatchBansSchema = new Schema({
	matchId: Number,
	champIdBan: Number
},
{
	collection: 'matchBans'
});

mongoose.model('MatchBans', MatchBansSchema);