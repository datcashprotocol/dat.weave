const express = require('express')
router = express.Router()
api = require('../controllers/tx.js')
dat = require('../controllers/dat/tx.js')

router.get('/:param/offset', api.tx_get_offset)
router.get('/:param/status', api.tx_get_status)
router.get('/dat/:param', dat.tx)

module.exports = router