const { Anthropic } = require('@anthropic-ai/sdk');

const client = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"] || "",
});

module.exports = {
    generate: async (message, model_name) => {
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
            const inputTokens = response.usage?.input_tokens || 0;
            const outputTokens = response.usage?.output_tokens || 0;

            return {
                content: response.content[0].text,
                usage: {
                    inputTokens,
                    outputTokens,
                    totalTokens: inputTokens + outputTokens
                }
            };
        } catch (error) {
            throw new Error(`Gemini API error: ${error.message}`);
        }
    }
};