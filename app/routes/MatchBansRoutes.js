'use strict'

var matchBans = require('../../app/controllers/MatchBansController');

module.exports = function(app) {
	app.route('/bans')
		.get(matchBans.list);	

	app.route('/bans/count')
		.get(matchBans.totalBans);

// order matters
	app.route('/bans/count/all')
		.get(matchBans.bansCountAll);
		
	app.route('/bans/count/:champId')
		.get(matchBans.bansChampId);
};