const mongo = require('mongodb')

exports.tx = (req, res) => {
	console.log('/tx/dat')

	const query = { address: req.params.txnID } 
	const MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const datweave = db.db('datweave');
		const wallets = datweave.collection('wallets');

		wallets.findOne(query)
		.catch((err) => {
			if(err) {
				console.log(err)
				throw err
			}
		})
		.then((document) => {
			if(document == null || document === undefined) {
				res.status(404)
			}
			else {
				res.status(200).json({ transactions: document.transactions })
			}

			db.close()
		})
	});	
};