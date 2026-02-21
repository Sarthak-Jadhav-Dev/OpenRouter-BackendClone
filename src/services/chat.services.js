const providerFactory = require('../provider/providerManager.provider');
const { calulatePrice } = require('../logistics/priceCal.logistics');

exports.processChat = async ({ message, providerName, model_name, API_key }, next) => {
  try {
    const provider = providerFactory.getProvider(providerName);
    const response = await provider.generate(message, model_name);
    
    console.log(`Response from ${providerName}:`, JSON.stringify(response, null, 2));
    
    // Calculate price and log usage
    if(API_key && response.usage) {
      console.log(`Logging usage for API key: ${API_key}`);
      await calulatePrice({
        API_key,
        providerName,
        model_name: model_name || "default",
        InputTokens: response.usage.inputTokens || 0,
        OutputTokens: response.usage.outputTokens || 0,
        totalTokens: response.usage.totalTokens || 0
      }, next);
    } else {
      console.warn(`Missing API_key or usage data. API_key: ${API_key}, usage: ${response.usage}`);
    }
    
    return response;
  } catch (error) {
    console.error(`Error in processChat: ${error.message}`);
    if(next) next(error);
    throw error;
  }
};