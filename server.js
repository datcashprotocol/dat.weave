/*
A minimalist testing api for Arweave js

Author:
Justin Chen

Last updated:
3/23/2022
*/

const express = require('express')
require('dotenv').config()

app = express()
app.use('/', require('./api/connect'))
// app.use('/mine', require('./api/home'))
app.use('/mint', require('./api/mint'))
// app.use('/get', require('./api/home'))
app.use('/price', require('./api/price'))
// app.use('/tx', require('./api/home'))
app.use('/upload', require('./api/upload'))
// app.use('/wallet', require('./api/home'))
// app.use('/wallet', require('./api/wallet/balance'))


const PORT = process.env.PORT || 1984

app.listen(PORT, () => {
  console.log(`port: ${PORT}`)
});
