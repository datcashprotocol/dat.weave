const mongo = require('mongodb')

exports.upload = (req, res) => {

	var MongoClient = mongo.MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var db = db.db('arweave');

		dbo.collection('mint').insertOne(req, function(err, res) {
			if (err) throw err;
			console.log('1 document inserted');
			db.close();
		});
	});	
};