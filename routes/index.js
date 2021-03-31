const express = require('express')

const router = express.Router()

const handle = require('./handle')





router.post('/CMUDict', handle.getCMUDict)
router.post('/getALITTS', handle.getALITTS)

module.exports = router