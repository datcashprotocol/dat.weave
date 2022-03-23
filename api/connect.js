const express = require('express')

router = express.Router()
connect = require('../controllers/connect.js')

router.get('/', connect.connect)

module.exports = router