const mongo = require('mongodb')

exports.tx_get = (req, res) => {
	console.log('get tx') //gets NFTGallery data
	// console.log(req)
	// var MongoClient = require('mongodb').MongoClient;

	// MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
	// 	if (err) throw err;
	// 	const datweave = db.db('datweave');
	//	const wallets = datweave.collection('wallets')

	// 	wallets.findOne({ address: req.wallet }, function(err, result) {
	// 		if (err) throw err
	// 		res.json(result)
	// 		db.close()
	// 	});
	// });	
};

exports.tx_post = (req, res) => {
	console.log('post tx')
	console.log(req.body)
	res.json({status: 200})
};