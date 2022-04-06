const express = require('express')
router = express.Router()
api = require('../controllers/tx.js')

router.get('/*/offset', api.tx_get_offset)
router.get('/*/status', api.tx_get_status)
router.post('/*', api.tx_post)

module.exports = router