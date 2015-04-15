'use strict'

var matchPlayerStats = require('../../app/controllers/MatchPlayerStatsController');

module.exports = function(app) {
	app.route('/playerStats')
		.get(matchPlayerStats.list);	

// order matters
//	app.route('/playerStats/duration')
//		.get(matchPlayerStats.duration);

//	app.route('/playerStats/:objKills')
//		.get(matchPlayerStats.objKills);

};