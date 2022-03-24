const { MongoClient } = require('mongodb')

exports.connect = (req, res) => {
	const client = new MongoClient('mongodb://localhost:27017')
	const dbName = 'myProject';

	client.connect().then(()=> {
		console.log('Connected successfully to server');
	
		const db = client.db(dbName);

		res.json({
			status: 200
		})
	})
};