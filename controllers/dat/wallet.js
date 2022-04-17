/*
Save transactions to wallet
*/

const mongo = require('mongodb')

exports.wallet = (req, res) => {
	console.log('/wallet/dat')
	const query = req.query
	const txnID = query.txnID
	const araddress = query.address

	const MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if(err) throw err;
		const datweave = db.db('datweave')
		const wallets = datweave.collection('wallets')
		const query = { address: araddress }

		wallets.findOne(query)
		.catch((err) => {
			console.log(err)
			throw err;
		})
		.then((document) => {
			if(document == null || document === undefined) {
				res.status(404).json({})
			}
			else {
				if(!document.hasOwnProperty('transactions')) {
					document.transactions = []
				}

				document.transactions.push({
					data: {
						uri: txnID
					}
				})

				wallets.updateOne(query, { $set: document })
				.catch((err) => {
					console.log(err)
					if(err) throw err
				})
				.then((result) => {
					db.close()
				})

				res.status(200).json({})
			}
		})
	});
};