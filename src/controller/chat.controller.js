const chatService = require("../services/chat.services");

exports.handleChat = async (req, res, next) => {
  try {
    const result = await chatService.processChat(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};