'use strict'

var _ = require('lodash'),
	glob = require('glob');

module.exports = {
	app: {
		title: 'The URF Games',
		description: 'Application submission for Riot API Challenge'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'jade',
	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'canuurf',
	sessionCollection: 'sessions',
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		format: 'combined',
		options: {
			stream: 'access.log'
		}
	},
	db: {
		user: 'user',
		pw: 'pw',
		host: 'host of db',
		port: port of db,
		db: 'db name',
		options: {
			server: {
				socketOptions: {
					keepAlive: 1,
					connectTimeOutMS: 30000
				}
			},
			replset: {
				socketOptions: {
					keepAlive: 1,
					connectTimeoutMS: 30000
				}
			}
		}
	},
	api_key: 'api_key'
};

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
	return output;
};
