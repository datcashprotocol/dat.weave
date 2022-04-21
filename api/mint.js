const express = require('express')
router = express.Router()
api = require('../controllers/mint.js')

router.get('/*', api.mint)

module.exports = router