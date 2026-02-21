const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

module.exports = {
    generate: async (message,model_name) => {
        try {
            const response = await openai.chat.completions.create({
                model: model_name || "gemini-2.5-flash",
                messages: [
                    {
                        role: "user",
                        content: message || "Hello Gemini!"
                    }
                ]
            });
            const inputTokens = response.usage?.promptTokens || 0;
            const outputTokens = response.usage?.completion_tokens||0;
            const totalTokens = response.usage?.total_tokens||0;
            return {
                content: response.choices[0].message.content,
                usage:{
                    inputTokens,
                    outputTokens,
                    totalTokens
                }
            }
        } catch (error) {
            throw new Error(`Gemini API error: ${error.message}`);
        }
    }
};