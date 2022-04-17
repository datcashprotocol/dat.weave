const express = require('express')
router = express.Router()
api = require('../controllers/wallet.js')
dat = require('../controllers/dat/wallet.js')

/* 
/wallet endpoint
https://docs.arweave.org/developers/server/http-api#wallets
*/
router.get('/:param/balance', api.balance)
router.get('/:param/last_tx', api.last_tx)
router.post('/dat', dat.wallet)
router.post('/clear', dat.clear)

module.exports = router