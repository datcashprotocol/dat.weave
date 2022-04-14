const mongo = require('mongodb')

exports.clear_mongo = () => {
	const MongoClient = mongo.MongoClient;
	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
		if (err) throw err;
		db.getCollectionNames().forEach(function(x) {db[x].drop()})
	});	
};