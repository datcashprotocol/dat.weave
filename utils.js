const mongo = require('mongodb')

exports.clear_mongo = () => {
	const MongoClient = mongo.MongoClient;
	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		const datweave = db.db('datweave')
		if (err) throw err;

		datweave.dropCollection('wallets', (err, ok) => {
			if(err) {
				throw err;
			}

			if(ok) {
				console.log('cleared wallets')
			}
		})
		datweave.dropCollection('transactions', (err, ok) => {
			if(err) {
				throw err;
			}

			if(ok) {
				console.log('cleared transactions')
			}

			db.close()
		})
	});	
};