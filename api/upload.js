const express = require('express')

router = express.Router()
api = require('../controllers/upload.js')

router.post('/', api.upload)

module.exports = router