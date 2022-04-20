/*
API for data chunks
*/

const mongo = require('mongodb')


// https://github.com/ArweaveTeam/arweave-js/blob/7572c93a50da305876e0734450fa3979e172ddfa/src/common/lib/transaction-uploader.ts#L151
exports.post_chunk = (req, res) => {
	console.log('POST /chunk')
	
	const MongoClient = mongo.MongoClient;

	// https://github.com/ArweaveTeam/arweave-js/blob/7572c93a50da305876e0734450fa3979e172ddfa/src/common/lib/transaction.ts#L198
	const body = req.body
	const chunk = body.chunk
	const offset = body.offset

	console.log(chunk)

	// make chunk string readable so can compare to mongo record while developing
	const sub_len = 10
	const chunk_truncated = chunk.substring(0, sub_len)+'...'+chunk.substring(chunk.length - sub_len)

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const datweave = db.db('datweave');
		const transactions = datweave.collection('transactions')

		const query = { data_root: body.data_root }

		transactions.findOne(query)
		.catch((err) => {
			console.log(err)
			throw err
		})
		.then((document) => {
			if(document == null || document === undefined) {
				res.status(404).end()
				db.close()
			}
			else {

				if(!('chunk' in document)) {
					document.chunk = {}
				}

				document.chunk[offset] = chunk

				transactions.updateOne(query, { $set: document })
				.catch((err) => {
					if(err) {
						console.log(err)
						res.status(500).end()
						throw err
					}
				})
				.then((result) => {
					res.status(200).end()
					db.close()
				})
			}
		})
	});	
};


exports.get_chunk = (req, res) => {
	console.log('GET /chunk')

	let params = req.params['0'].split('/')
	const query = { id: params[0] }
	const offset = params[1]

	const MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if(err) {
			res.status(500).end()
			throw err
			db.close()
		}

		const datweave = db.db('datweave');
		const transactions = datweave.collection('transactions')

		transactions.findOne(query)
		.catch((err) => {
			console.log(err)
			res.status(500).end()
			throw err
		})
		.then((document) => {
			if(document == null || document === undefined) {
				res.status(404).end()
				db.close()
			}
			else {
				res.status(200).json({ 
					data: document.chunk[offset]
				})
				db.close()
			}
		})
	})
}