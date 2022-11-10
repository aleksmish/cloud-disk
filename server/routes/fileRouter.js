const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')
const avatarPathMiddleware = require('../middleware/avatarpath.middleware')
const path = require('path')

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/avatar', authMiddleware, avatarPathMiddleware(path.resolve(__dirname, '..', 'static')), fileController.uploadAvatar)
router.delete('/avatar', authMiddleware, avatarPathMiddleware(path.resolve(__dirname, '..', 'static')), fileController.deleteAvatar)
router.get('', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFile)
router.delete('/', authMiddleware, fileController.deleteFile)

module.exports = router
