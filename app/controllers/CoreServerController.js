'use strict'

exports.index = function(req, res) {
	res.render('index.html', {
		request: req
	});
};
