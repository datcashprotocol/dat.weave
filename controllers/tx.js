const mongo = require('mongodb')

// TODO: Do I need this? not called in api/tx.js
exports.tx_post = (req, res) => {
	console.log('POST /tx')

	const body = req.body
	const data = body.data

	const txn = {
		id: body.id,
		data_root: body.data_root,
		owner: body.owner,
		chunk: (data != null && data !== undefined) ? { "0": data } : {}
	}

	const MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) {
			res.status(500).end()
			throw err;
		}

		const datweave = db.db('datweave');
		const wallets = datweave.collection('wallets');
		const transactions = datweave.collection('transactions');

		transactions.insertOne(txn)
		.catch((err) => {
			if(err) {
				console.log(err)
				res.status(500).end()
				throw err
			}
		})
		.then(() => {
			res.status(200).end()
			db.close()
		})
	});	
};

/*

*/
exports.tx_get_offset = (req, res) => {
	console.log('GET /:txnID/offset')

	if(Object.keys(req.params).length === 0) {
		res.status(404).end()
	}
	else {
		const txnID = req.params['txnID'].replace(/\s/g, '');

		if(txnID.length == 0) {
			res.status(404).end()
			return
		}

		var MongoClient = require('mongodb').MongoClient;

		MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
			if (err) throw err;
			const datweave = db.db('datweave');
			const transactions = datweave.collection('transactions')

			transactions.findOne({ id: txnID })
			.catch((err) => {
				if(err) {
					console.log(err)
					throw err
				}
			})
			.then((document) => {

				if(document === null || !document.hasOwnProperty('chunk')) {
					res.status(404).end()
				}
				else {
					const chunks = document.chunk
					const chunkKeys = Object.keys(chunks)
					const size = chunkKeys.reduce((prev, current) => prev + chunks[current].length, 0)
					const offsets = chunkKeys.map(offset => parseInt(offset))

					res.status(200).json({
						offsets: offsets,
						size: size
					})
				}

				db.close()
			})
		});	
	}
};

// TODO: idk what this api does yet
exports.tx_get_status = (req, res) => {
	console.log('GET /:txnID/status')

	res.status(200).end()
};