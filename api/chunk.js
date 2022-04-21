const express = require('express')

router = express.Router()
api = require('../controllers/chunk.js')

router.post('/*', api.post_chunk)
router.get('/:txnID/:offset', api.get_chunk)

module.exports = router