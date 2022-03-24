const { MongoClient } = require('mongodb')

function randomString(length) {
    var result = ''
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

exports.tx_anchor = (req, res) => {
	console.log('tx_anchor')
	// console.log(req)

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) {
			console.log('err0')
			throw err
		}

		const datweave = db.db('datweave');
		const transactions = datweave.collection('transactions');

		transactions.findOne({}, {sort: {_id: -1}, limit: 1 })
		.catch((err) => {
			console.log('err1')
			console.log(err)
			throw err
		})
		.then((document) => {
			if(document == null || document === undefined) {
				const tx = randomString(64)
				const txn_0 = {
					data: tx // last_tx and first transaction
				}

				transactions.insertOne(txn_0)
				.catch((err) => {
					console.log('err2')
					console.log(err)
					throw err
				})
				.then(() => {
					console.log(`inserted: ${ tx }`)
					db.close()
				})

				document = txn_0
			}

			res.json(document)
		})
		.catch((err) => {
			console.log('err3')
			console.log(err)
			throw err
		})
	}); 
};