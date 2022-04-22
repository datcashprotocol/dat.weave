# datweave
Minimalist backend simulation for developing on Arweave

![example workflow](https://github.com/DAT-Cash/datweave/actions/workflows/main.yml/badge.svg)

### Installation
1. In the root directory: `npm install`
2. Install MongoDb
3. Open a terminal and start the MongoDB daemon

For OSX
```
brew services start mongodb-community@5.0

mongosh
```

4. In a separate terminal run `npm run dev`


### Setup
Create `.env` in root with parameters

`touch .env`

Example parameters
```
PORT=1984
LIMIT=50mb
MODE=test
```

`MODE=dev` is for developing datweave
`MODE=test` is for testing datweave

### Run dev
`npm run dev` with `MODE=dev` will listen to port `1984` and with `MODE=test` will run via Jest.

### Run Jest unit tests
`npm run test`
This will watch for changes and immediately run tests.
Do not need to open in a new terminal or have MongoDB or Node running. Jest and MongoMemoryServer will take care of this, but do need to set `MODE=test`.

### How this repo is structured

 - /dat contains endpoints specific to datweave. Needed to have a way to relate wallets to their transactions without relying on retrieving metadata from Solana so that datweave can be used independently offline.

### Mongo shell commands

Show databases
```
show dbs
```

Display all records from collection
```
show dbs
use <dbs name>
show collections
db.<collection name>.find({})
```

Find a record and ignore `chunk` property
```
db.transactions.find({id: "4Z7FstvUq4JExe-KpvEJbORt3VoVyr5cCTeTBbX0-Lk"}, {chunk:0}).pretty()
```

Examine a specific chunk
```
db.transactions.find({id: "4Z7FstvUq4JExe-KpvEJbORt3VoVyr5cCTeTBbX0-Lk"}, {chunk: "145978"}).pretty()
```

Count documents
```
db.transactions.countDocuments()
```

Delete one document
e.g.
```
db.wallets.deleteOne({_id: ObjectId("623cc2c2c032fde16a31aeb5")})
```

Delete all documents
```
db.transactions.deleteMany({})
```

Export record to file
```
mongoexport --db datweave --collection wallets --out wallets.json
```