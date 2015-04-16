'use strict'

var matchPlayerStats = require('../../app/controllers/MatchPlayerStatsController');

module.exports = function(app) {
	app.route('/playerStats')
		.get(matchPlayerStats.list);	


	app.route('/playerStats/sumcounts/:sc')
		.get(matchPlayerStats.sc);

	app.route('/playerStats/:obj')
		.get(matchPlayerStats.getObj);

};