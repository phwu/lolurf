'use strict'

var //init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

// Bootstrap db connection
var dburi = 'mongodb://'+config.db.user+':'+config.db.pw+'@'+config.db.host+':'+config.db.port+'/'+config.db.db;
var db = mongoose.connect(dburi, config.db.options, function(err) {
	if (err){
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDV connection error: ' + err));
	process.exit(-1);
});

// Init express
var app = require('./config/express')(db);

// Start app
app.listen(process.env.PORT);

// Expose app
exports = module.exports = app;

// Initialize Logging
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + dburi));
console.log('--');