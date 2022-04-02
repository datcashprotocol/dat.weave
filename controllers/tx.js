const mongo = require('mongodb')

exports.tx_get = (req, res) => {
	// front end calls this 114 times if does not get a valid resp
	console.log('/tx_get', Date.now()) //gets NFTGallery data

	const body = req.body
	console.log(body)

	if(Object.keys(body).length === 0) {
		res.json({ status: 200 })
	}
	else {
		const url = body.originalUrl
		const txnID = url.split('/')[-2]

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
				res.json(document.chunk) // TODO: I think should return chunk directly?
				db.close()
			})
		});	
	}
};

exports.tx_post = (req, res) => {
	console.log('/tx_post')
	const body = req.body
	const txn = {
		id: body.id,
		data_root: body.data_root,
		owner: body.owner
	}

	console.log(`/tx endpoint:\nid: ${txn.id}\nowner: ${txn.owner}\ndata_root:${txn.data_root}`)

	const MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const datweave = db.db('datweave');
		const transactions = datweave.collection('transactions')

		transactions.insertOne(txn)
		.catch((err) => {
			if(err) {
				console.log(err)
				throw err
			}
		})
		.then(() => {
			console.log(`inserted txn ${ txn.id }`)
			res.json({ status: 200 })
			db.close()
		})
	});	
};