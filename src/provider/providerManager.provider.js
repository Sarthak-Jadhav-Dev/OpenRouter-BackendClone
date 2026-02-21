
const openaiProvider = require("./openai.provider");
const geminiProvider = require("./gemini.provider");
const anthropicProvider = require("./anthropic.provider");
const deepseekProvider = require("./deepseek.provider")
const calculatePrice = require("../logistics/priceCal.logistics");

const providers = {
  openai: openaiProvider,
  gemini: geminiProvider,
  anthropic: anthropicProvider,
  deepseek: deepseekProvider
};

exports.getProvider = (providerName) => {
  const provider = providers[providerName];

  if (!provider) {
    throw new Error(`Provider ${providerName} not supported`);
  }

  return provider;
};