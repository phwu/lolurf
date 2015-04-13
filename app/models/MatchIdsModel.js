'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// gameId is matchId; collection name already established in mongodb
var MatchIdsSchema = new Schema({
	gameId: Number,
	date: Number
},
{
	collection: 'matchIds'
});

mongoose.model('MatchIds', MatchIdsSchema);