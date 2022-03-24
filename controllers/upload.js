const mongo = require('mongodb')

exports.upload = (req, res) => {
	let record = {}
	const address = ""

	var MongoClient = mongo.MongoClient;

	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		const arweave = db.db('arweave');

		const query = { address: address }

		arweave.collection('wallets').findOne(query)
		.catch((err) => {
			console.log(err)
			throw err
		})
		.then((document) => {
			if(document === undefined) {
				arweave.collection('wallet').insertOne(record)
				.catch((err) => {
					console.log(err)
					if(err) throw err
				})
				.then((result) => {
					console.log(result)
					console.log('1 document inserted');
					db.close();
				})
			}
			else {
				arweave.collection('wallet').updateOne(record)
				.catch((err) => {
					console.log(err)
					if(err) throw err
				})
				.then((result) => {
					console.log(result)
					console.log(`uploaded to: ${ address }`);
					db.close();
				})
			}
		})
	});	
};