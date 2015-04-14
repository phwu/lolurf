'use strict'

var matchBans = require('../../app/controllers/MatchBansController');

module.exports = function(app) {
	app.route('/bans')
		.get(matchBans.list);	

	app.route('/bans/:matchId')
		.get(matchBans.bansByMatchId);

	app.route('/bansCount')
		.get(matchBans.totalBans);
};