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
/*	
	// bans from 1st pick	
	app.route('/bans/count/all/1')
	// bans from 2nd pick	
	app.route('/bans/count/all/2')
	// bans from 3rd pick	
	app.route('/bans/count/all/3')
*/
// not working right now		
/*	app.route('/bans/count/:champId')
		.get(matchBans.bansChampId);
		*/
};