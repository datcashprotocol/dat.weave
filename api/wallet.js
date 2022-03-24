const express = require('express')
router = express.Router()
api = require('../controllers/wallet.js')

router.get(/^\/([a-zA-Z]+([0-9]+[a-zA-Z]+)+)\/balance$/i, api.wallet)

module.exports = router