/*
Save transactions to wallet
*/

const mongo = require('mongodb')

exports.wallet = (req, res) => {
	console.log('/post_solana')
	const query = req.query
	const soladdress = query.soladdress
	const araddress = query.araddress

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
				res.json({ status: 404 })
			}
			else {
				if(!document.hasOwnProperty('transactions')) {
					document.transactions = []
				}

				document.transactions.push(soladdress)

				wallets.updateOne(query, { $set: document })
				.catch((err) => {
					console.log(err)
					if(err) throw err
				})
				.then((result) => {
					console.log(`updated: ${ araddress }`)
					db.close()
				})

				res.json({ status: 200 })
			}
		})
	});
};