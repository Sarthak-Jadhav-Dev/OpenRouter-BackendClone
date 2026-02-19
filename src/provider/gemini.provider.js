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
            return response.choices[0].message.content;
        } catch (error) {
            throw new Error(`Gemini API error: ${error.message}`);
        }
    }
};