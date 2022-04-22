/*
MongoMemoryServer docs:
https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners
*/

const mongo = require('mongodb')
const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer

const dbname = 'datweave'

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

exports.randomString = (length) => {
    var result = ''
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

exports.startDB = async function () {
	const server = await MongoMemoryServer.create()

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    const uri = server.getUri(dbname)
    await mongoose.connect(uri, opts);
};

exports.stopDB = async function () {
	const server = await MongoMemoryServer.create()
    await mongoose.disconnect();
    await server.stop();
};