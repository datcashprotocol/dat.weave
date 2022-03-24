const express = require('express')

router = express.Router()
api = require('../controllers/connect.js')

router.get('/', api.connect)

module.exports = router