const mongo = require('mongodb')

exports.chunk = (req, res) => {
	const MongoClient = mongo.MongoClient;

	console.log('/chunk')

	const body = req.body
	const record = {
		data_root: body.data_root,
		data_size: body.data_size,
		data_path: body.data_path,
		offset: body.offset,
		chunk: body.chunk
	}

	const chunk = body.chunk
	const chunk_truncated = chunk.substring(0, 10)+'...'+chunk.substring(chunk.length - 10)
	console.log(chunk_truncated, '| offset:', body.offset, ' | len: ', chunk.length)

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const datweave = db.db('datweave');
		const transactions = datweave.collection('transactions')

		const query = { data_root: record.data_root }

		transactions.findOne(query)
		.catch((err) => {
			console.log(err)
			throw err
		})
		.then((document) => {
			if(document == null || document === undefined) {
				res.json({})
				db.close()
			}
			else {
				record.id = document.id
				record.data_root = document.data_root
				record.owner = document.owner

				transactions.updateOne(query, { $set: record })
				.catch((err) => {
					if(err) {
						console.log(err)
						throw err
					}
				})
				.then((result) => {
					// console.log(result) // TODO: add to log instead of console
					console.log(`uploaded chunk for txn: ${ record.id }`)
					res.json({})
					db.close()
				})
			}
		})
	});	
};