const { MongoClient } = require('mongodb')

function randomString(length) {
    var result = ''
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

exports.tx_anchor = (req, res) => {
	console.log('tx_anchor')

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) {
			throw err
		}

		const datweave = db.db('datweave');
		const transactions = datweave.collection('transactions');

		// this gets the last transaction
		transactions.findOne({}, {sort: {_id: -1}, limit: 1 })
		.catch((err) => {
			console.log(err)
			throw err
		})
		.then((document) => {
			if(document == null || document === undefined) {
				const tx = 'initial transaction for subsequent calls to tx_anchor for last txn'
				const txn_0 = {
					data: tx // last_tx is first transaction
				}

				// add a first transaction
				transactions.insertOne(txn_0)
				.catch((err) => {
					console.log(err)
					throw err
				})
				.then(() => {
					db.close()
				})

				document = txn_0
			}

			res.status(200).json(document)
		})
		.catch((err) => {
			console.log(err)
			throw err
		})
	}); 
};