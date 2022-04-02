const express = require('express')

router = express.Router()
api = require('../controllers/chunk.js')

router.post('/', api.post_chunk)
router.get('/', api.get_chunk)

module.exports = router