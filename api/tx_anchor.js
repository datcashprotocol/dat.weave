const express = require('express')

router = express.Router()
api = require('../controllers/tx_anchor.js')

router.get('/', api.tx_anchor)

module.exports = router