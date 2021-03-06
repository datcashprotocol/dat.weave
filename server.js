/*
A minimalist testing api for Arweave-js

Author:
Justin Chen
*/

const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

// default in case not set in .env
const limit = '50mb'

app = express()

app.use(bodyParser.json({ 
  limit: process.env.LIMIT || limit
}))

app.use(bodyParser.urlencoded({
  limit: process.env.LIMIT || limit,
  extended: false,
}))


app.use('/mine', require('./api/mine'))
app.use('/mint', require('./api/mint'))
app.use('/price', require('./api/price'))
app.use('/tx', require('./api/tx'))
app.use('/chunk', require('./api/chunk'))
app.use('/wallet', require('./api/wallet'))
app.use('/tx_anchor', require('./api/tx_anchor'))

const PORT = process.env.PORT || 1984

if(process.env.MODE == 'dev') {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`port: ${PORT}`)
  });
}
else if(process.env.MODE == 'test') {
  module.exports = app;
}