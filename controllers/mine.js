const mongo = require('mongodb')

exports.mine = (req, res) => {
	console.log('GET /mine')
	res.status(200).end()
};