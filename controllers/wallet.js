const mongo = require('mongodb')

exports.balance = (req, res) => {
	console.log('GET /wallet/:address/balance')

	const address = req.params['address']

	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const datweave = db.db('datweave');
		const wallets = datweave.collection('wallets')

		wallets.findOne({ address: address })
		.catch((err) => {
			console.log(err)
			res.status(500).end()
			if (err) throw err
		})
		.then((document) => {
			if(document == null || document === undefined) {
				res.status(404).end()
			}
			else {
				res.status(200).json(document.winstons)
			}

			db.close()
		})
	});	
};


// TODO
exports.last_tx = (req, res) => {
	console.log('GET /wallet/:address/last_tx')

	const address = req.params['address']

	res.status(200).end()
};