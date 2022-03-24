const mongo = require('mongodb')

exports.mint = (req, res) => {
	const url = req.originalUrl.trim().split('/').filter(x => x.length > 0)
    const address = url[1]
    const winstons = url[2]

    var MongoClient = mongo.MongoClient;
    var dbURL = 'mongodb://localhost:27017/';

    MongoClient.connect(dbURL, function(err, db) {
        if (err) throw err;
        const arweave = db.db('arweave');

        const record = {
            address: address,
            winstons: winstons
        }
        
        const query = {address: address}

        arweave.collection('wallets').findOne(query)
        .catch((err) => {
            console.log(err)
            throw err
        })
        .then((document) => {

            if(document === undefined) {
                arweave.collection('wallets').insertOne(record)
                .then(() => {
                    console.log(`inserted: ${address}`)
                    db.close()
                })
            }
            else {
                record.winstons = parseInt(winstons) + parseInt(document.winstons)

                arweave.collection('wallets').updateOne(query, { $set: record }, function(err, res) {
                    if(err) throw err
                    console.log(`updated: ${address}`)
                    db.close()
                })
            }
        })
        .catch((err) => {
            console.log(err)
            throw err
        })
    }); 
};