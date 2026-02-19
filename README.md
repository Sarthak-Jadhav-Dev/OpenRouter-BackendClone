# OpenRouter Backend

A robust backend service that provides a unified API interface for interacting with multiple Large Language Model (LLM) providers, including OpenAI, Google Gemini, and Anthropic. This project simplifies the integration of various AI models into your applications by offering a consistent chat interface and built-in API key management.

## 🚀 Features

- **Multi-Provider Support**: Seamlessly switch between OpenAI, Google Gemini, and Anthropic models.
- **Unified Chat API**: a single endpoint to interact with different LLMs.
- **API Key Management**: Generate, list, and delete API keys securely.
- **Authentication**: Secure endpoints protected by custom middleware and Supabase integration.
- **Scalable Architecture**: Built with Node.js and Express, designed for easy extension.

## 🛠️ Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **AI SDKs**:
  - `openai` (used for both OpenAI and Gemini via compatibility layer)
  - `@anthropic-ai/sdk`
- **Utilities**: `dotenv` for configuration, `nodemon` for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A [Supabase](https://supabase.com/) project for authentication and data storage.
- API Keys for the providers you intend to use:
  - [OpenAI API Key](https://platform.openai.com/api-keys)
  - [Google Gemini API Key](https://makersuite.google.com/app/apikey)
  - [Anthropic API Key](https://console.anthropic.com/settings/keys)

## ⚙️ Installation

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd Backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your configuration details:
    ```env
    PORT=3000
    
    # AI Provider Keys
    OPENAI_API_KEY=your_openai_api_key_here
    GEMINI_API_KEY=your_gemini_api_key_here
    ANTHROPIC_API_KEY=your_anthropic_api_key_here

    # Supabase Configuration
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_KEY=your_supabase_anon_key
    ```

## 🏃‍♂️ Running the Application

### Development Mode
Use `nodemon` to automatically restart the server on file changes:
```bash
npm run dev
```

### Production Mode
Start the server normally:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env`).

## 🔌 API Endpoints

### Chat Layer
Interact with LLMs via a unified endpoint.

#### `GET /api/layers/chat`
*Note: Although this is a GET request, it currently requires a JSON body. Ensure your HTTP client supports GET requests with a body.*

**Request Body:**
```json
{
  "provider": "openai", 
  "model": "gpt-3.5-turbo",
  "message": "Hello, how are you?"
}
```
*Supported Providers: `openai`, `gemini`, `anthropic`*

### API Key Management
Manage API keys for accessing the service. These endpoints are protected and require valid authentication.

#### `GET /api/keys/list`
Retrieve a list of all active API keys.

#### `POST /api/keys/generate`
Generate a new API key.

#### `DELETE /api/keys/delete`
Revoke/Delete an existing API key.

## 📂 Project Structure

```
src/
├── controller/     # Request handlers (Chat, Keys)
├── middleware/     # Auth and Error handling middleware
├── model/          # Database clients (Supabase)
├── provider/       # AI Provider integration (OpenAI, Gemini, Anthropic)
├── routes/         # API Route definitions
├── services/       # Business logic
├── app.js          # Express app setup
└── index.js        # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
