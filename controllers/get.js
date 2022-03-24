const mongo = require('mongodb')

exports.get = (req, res) => {
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const datweave = db.db('datweave');
		const wallets = datweave.collection('wallets')

		wallets.findOne({ address: req.wallet }, function(err, result) {
			if (err) throw err
			res.json(result)
			db.close()
		});
	});	
};