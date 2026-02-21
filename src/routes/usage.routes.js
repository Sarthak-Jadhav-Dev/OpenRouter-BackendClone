const express = require('express');
const router = express.Router();
const usageController = require('../controller/usage.controller')
const authMiddleware = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/error.middleware');

router.use(errorMiddleware)
router.get('/check', authMiddleware, usageController);

module.exports = router;