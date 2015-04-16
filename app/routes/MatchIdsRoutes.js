'use strict'

var matchIds = require('../../app/controllers/MatchIdsController');

module.exports = function(app) {
	
	/*app.route('/matches')
		.get(matchIds.list);	*/
	app.route('/matches/count')
		.get(matchIds.totalMatches);
		
	app.route('/matches/:batch(1|2|3)?')
		.get(matchIds.list);	

	app.route('/matches/:date')
		.get(matchIds.matchIdsByDate);
		
	app.route('/matches/count/:date')
		.get(matchIds.matchCountByDate);
};