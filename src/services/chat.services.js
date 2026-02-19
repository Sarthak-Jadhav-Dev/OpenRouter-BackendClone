const providerFactory = require('../provider/providerManager.provider');

exports.processChat = async ({ message, providerName }) => {
  const provider = providerFactory.getProvider(providerName);
  const response = await provider.generate(message);
  return response;
};