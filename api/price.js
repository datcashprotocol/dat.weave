const express = require('express')
router = express.Router()
api = require('../controllers/price.js')

router.get('/*', api.uploadEstimate)

module.exports = router