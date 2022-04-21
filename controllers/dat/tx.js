/*

*/

const mongo = require('mongodb')

// Get all transactions from a given transaction
exports.tx = (req, res) => {
	console.log('GET /dat/:txnID')

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
				res.status(404).end()
			}
			else {
				res.status(200).json({ transactions: document.transactions })
			}

			db.close()
		})
	});	
};

exports.clear = (req, res) => {
	console.log('POST /tx/clear')

	const MongoClient = mongo.MongoClient;
	
	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		const datweave = db.db('datweave')
		if (err) throw err;

		datweave.dropCollection('transactions', (err, ok) => {
			res.status(200).end()
		})
	});
};