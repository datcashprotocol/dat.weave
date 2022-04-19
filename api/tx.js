const express = require('express')
router = express.Router()
api = require('../controllers/tx.js')
dat = require('../controllers/dat/tx.js')

// if transcation is in POST body 
// https://github.com/ArweaveTeam/arweave-js/blob/7572c93a50da305876e0734450fa3979e172ddfa/src/common/lib/transaction-uploader.ts#L267
router.post('/', api.tx_post) 
router.get('/:txnID/offset', api.tx_get_offset)
router.get('/:txnID/status', api.tx_get_status)
router.get('/dat/:txnID', dat.tx)
router.post('/clear', dat.clear)

module.exports = router