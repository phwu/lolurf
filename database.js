var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var config = require('./config');

var mongodbUri = 'mongodb://'+config.mongo.user+':'+config.mongo.pw+'@'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db;
var db = false;

function connectToDatabase() {
	var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
               replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

    var mongooseUri = uriUtil.formatMongoose(mongodbUri);

    mongoose.connect(mongooseUri);
    db = true;

    return mongoose;
};

var database = {
	getConnection : function() {
		return (db) ? mongoose : connectToDatabase();
	},

	closeConnection : function() {

	}
}

module.exports = database;