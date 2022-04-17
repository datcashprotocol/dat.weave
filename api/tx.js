const express = require('express')
router = express.Router()
api = require('../controllers/tx.js')
dat = require('../controllers/dat/tx.js')

router.get('/:txnID/offset', api.tx_get_offset)
router.get('/:txnID/status', api.tx_get_status)
router.get('/dat/:txnID', dat.tx)
router.post('/clear', dat.clear)

module.exports = router