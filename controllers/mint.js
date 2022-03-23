const mongo = require('mongodb')

exports.mint = (req, res) => {
	const url = req.originalUrl.trim().split('/').filter(x => x.length > 0)
    const address = url[1]
    const winstons = url[2]

    console.log(address)
    console.log(winstons)

    var MongoClient = mongo.MongoClient;
    var dbURL = 'mongodb://localhost:27017/';

    MongoClient.connect(dbURL, function(err, db) {
        if (err) throw err;
        const arweave = db.db('arweave');

        const record = {
            address: address,
            winstons: winstons
        }

        arweave.collection('wallets').insertOne(record, function(err, res) {
            if (err) throw err;
            console.log('1 document inserted');
            db.close();
        });
    }); 
};