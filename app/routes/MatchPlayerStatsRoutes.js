'use strict'

var matchPlayerStats = require('../../app/controllers/MatchPlayerStatsController');

module.exports = function(app) {
	
	app.route('/playerStats')
		.get(matchPlayerStats.list);	

/** For all players **/
	app.route('/playerStats/sumcounts/spell1Ids')
		.get(matchPlayerStats.spell1Ids);
	app.route('/playerStats/sumcounts/spell2Ids')
		.get(matchPlayerStats.spell2Ids);
	app.route('/playerStats/sumcounts/:sc')
		.get(matchPlayerStats.sc);
		
/** For Team Players**/
	app.route('/playerStats/:obj')
		.get(matchPlayerStats.getObj);

};