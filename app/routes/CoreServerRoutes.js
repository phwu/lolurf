'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/CoreServerController');
	
	app.route('/')
		.get(core.index);
};