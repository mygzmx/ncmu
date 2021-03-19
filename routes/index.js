const express = require('express')

const router = express.Router()

const handle = require('./handle')





router.post('/CMUDict', handle.getCMUDict)
router.get('/getJsonList', handle.getJsonList)

module.exports = router