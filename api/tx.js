const express = require('express')
router = express.Router()
api = require('../controllers/tx.js')

router.get('/*', api.tx_get)
router.post('/*', api.tx_post)

module.exports = router