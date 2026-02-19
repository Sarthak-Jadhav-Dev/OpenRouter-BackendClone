const express = require('express')
const router = express.Router()
const keysController = require('../controller/keys.controller')
const authKeysMiddleware = require('../middleware/authForKeys.middleware');
const errorMiddleware = require('../middleware/error.middleware');

router.use(errorMiddleware)
router.get('/list', authKeysMiddleware, keysController.listKeys);
router.post('/generate', authKeysMiddleware, keysController.addKey);
router.delete('/delete', authKeysMiddleware, keysController.deleteKey);

module.exports = router;
