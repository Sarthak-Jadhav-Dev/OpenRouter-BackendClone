const chatService = require("../services/chat.services");

exports.handleChat = async (req, res, next) => {
  try {
    const API_key = req.headers['api-key'];
    const result = await chatService.processChat({
      ...req.body,
      API_key
    }, next);
    res.json(result);
  } catch (err) {
    next(err);
  }
};