
const openaiProvider = require("./openai.provider");
const geminiProvider = require("./gemini.provider");
const anthropicProvider = require("./anthropic.provider");

const providers = {
  openai: openaiProvider,
  gemini: geminiProvider,
  anthropic: anthropicProvider
};

exports.getProvider = (providerName) => {
  const provider = providers[providerName];

  if (!provider) {
    throw new Error(`Provider ${providerName} not supported`);
  }

  return provider;
};