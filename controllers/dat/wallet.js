/*
Save transactions to wallet. 

This should only be called after files are uploaded via /upload and /chunk.
*/

const mongo = require('mongodb')

exports.wallet = (req, res) => {
	console.log('POST /wallet/dat')
	const query = req.query
	const txnID = query.txnID
	const araddress = query.address

	console.log(`address: ${araddress}`)

	const MongoClient = mongo.MongoClient

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
				res.status(404).end()
				console.log(`could not find ${araddress}`)
			}
			else {
				console.log(document)
				if(!document.hasOwnProperty('transactions')) {
					console.log(`${araddress} is missing transactions`)
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

				res.status(200).end()
			}
		})
	});
};

exports.clear = (req, res) => {
	console.log('POST /wallet/clear')

	const MongoClient = mongo.MongoClient

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		const datweave = db.db('datweave')
		if (err) throw err;

		datweave.dropCollection('wallets', (err, ok) => {
			res.status(200).end()
		})
	})
};