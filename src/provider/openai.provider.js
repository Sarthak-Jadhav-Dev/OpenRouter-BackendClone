const {OpenAI} = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

module.exports = {
    generate: async (message,model_name) => {
        try {
            const response = await openai.chat.completions.create({
                model: model_name || "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: message || "Hello ChatGPT!"
                    }
                ]
            });
            return response.choices[0].message.content;
        } catch (error) {
            throw new Error(`Gemini API error: ${error.message}`);
        }
    }
};