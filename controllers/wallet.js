const mongo = require('mongodb')

exports.balance = (req, res) => {
	console.log('GET /wallet/:param/balance')

	const url = req.originalUrl.trim().split('/').filter(x => x.length > 0)
	const address = url[1]

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
	console.log('GET /wallet/:param/last_tx')

	res.status(200).end()
};