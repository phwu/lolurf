'use strict'

var matchBans = require('../../app/controllers/MatchBansController');

module.exports = function(app) {

	app.route('/matchBans')
		.get(matchBans.list);	

	app.route('/matchBans/count')
		.get(matchBans.totalBans);

// order matters
	app.route('/matchBans/count/all')
		.get(matchBans.bansCountAll);

// need to work on
	app.route('/matchBans/count/:champId')
		.get(matchBans.bansChampId);
		
};