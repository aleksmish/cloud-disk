const router = require('express').Router()
const fileRouter = require('./fileRouter')
const authRouter = require('./authRouter')

router.use('/auth', authRouter)
router.use('/files', fileRouter)

module.exports = router