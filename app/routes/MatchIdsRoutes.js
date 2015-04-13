'use strict'

var matchIds = require('../../app/controllers/MatchIdsController');

module.exports = function(app) {
	app.route('/matches')
		.get(matchIds.list);	

	app.route('/matches/:date')
		.get(matchIds.matchIdsByDate);

	app.param('date', matchIds.matchIdsByDate);
};