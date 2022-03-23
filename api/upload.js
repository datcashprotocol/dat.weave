const express = require('express')

router = express.Router()
upload = require('../controllers/upload.js')

router.post('/', upload.upload)

module.exports = router