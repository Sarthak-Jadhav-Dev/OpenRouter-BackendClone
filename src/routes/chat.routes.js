const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat.controller');
const authMiddleware = require('../middleware/auth.middleware');
const errorMiddleware = require('../middleware/error.middleware');

router.use(errorMiddleware)
router.post('/chat', authMiddleware, chatController.handleChat);

module.exports = router;