const { MongoClient } = require('mongodb')

exports.connect = (req, res) => {
	const url = 'mongodb://localhost:27017'
	const client = new MongoClient(url)
	const dbName = 'myProject';

	client.connect().then(()=> {
		console.log('Connected successfully to server');
	
		const db = client.db(dbName);
		const collection = db.collection('documents');

		res.json({
			status: 200
		})
	})
};