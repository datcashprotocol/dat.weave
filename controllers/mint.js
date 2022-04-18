const mongo = require('mongodb')

exports.mint = (req, res) => {
	const url = req.originalUrl.trim().split('/').filter(x => x.length > 0)
	const address = url[1]
	const winstons = url[2]

	var MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) {
			res.status(500).end()
			throw err;
		}

		const datweave = db.db('datweave');
		const wallets = datweave.collection('wallets')

		const record = {
			address: address,
			winstons: winstons,
			transactions: []
		}
		
		const query = { address: address }

		wallets.findOne(query)
		.catch((err) => {
			console.log(err)
			res.status(500).end()
			throw err
		})
		.then((document) => {

			if(document == null || document === undefined) {
				wallets.insertOne(record)
				.then(() => {
					res.status(200).end()
					db.close()
				})
			}
			else {
				record.winstons = parseInt(winstons) + parseInt(document.winstons)

				wallets.updateOne(query, { $set: record })
				.catch((err) => {
					console.log(err)
					res.status(500).end()
					if(err) throw err
				})
				.then((result) => {
					res.status(200).end()
					db.close()
				})
			}
		});
	}); 
};