const express = require('express')
router = express.Router()
api = require('../controllers/mine.js')

router.get('/', api.mine)

module.exports = router