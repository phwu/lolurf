'use strict'

var matchTeamStats = require('../../app/controllers/MatchTeamStatsController');

module.exports = function(app) {
	app.route('/teamStats')
		.get(matchTeamStats.list);	

// order matters
	app.route('/teamStats/duration')
		.get(matchTeamStats.duration);

	app.route('/teamStats/:objKills')
		.get(matchTeamStats.objKills);

};