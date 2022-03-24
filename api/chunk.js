const express = require('express')

router = express.Router()
api = require('../controllers/chunk.js')

router.post('/', api.chunk)

module.exports = router