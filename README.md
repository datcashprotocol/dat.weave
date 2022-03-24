# datweave
Minimalist backend simulation for developing on Arweave

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
```

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
db.<collection name>.find()
```
