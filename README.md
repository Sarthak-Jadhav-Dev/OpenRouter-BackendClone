# OpenRouter Backend

A robust backend service that provides a unified API interface for interacting with multiple Large Language Model (LLM) providers, including OpenAI, Google Gemini, Anthropic, and DeepSeek. This project simplifies the integration of various AI models into your applications by offering a consistent chat interface, built-in API key management, automatic usage tracking, and pay-per-token billing.

## 🚀 Features

- **Multi-Provider Support**: Seamlessly switch between OpenAI, Google Gemini, Anthropic, and DeepSeek models through a single API.
- **Unified Chat API**: A single `POST` endpoint to interact with all supported LLMs — just specify the provider and model.
- **API Key Management**: Generate, list, and delete API keys securely, scoped per user.
- **Automatic Usage Tracking**: Every chat request automatically logs token consumption (input, output, total) per API key.
- **Pay-Per-Token Billing**: Price calculations based on a configurable pricing table (`pricing` table in Supabase) with a 5% commission layer.
- **Usage & Billing Endpoint**: Check aggregated usage stats and the final price for a user across all their API keys.
- **Authentication**: Two-layer auth middleware — user-only validation for key management, and user + API key validation for chat requests.
- **Model Pricing Reference**: Includes a comprehensive CSV (`Token-Prices/Model_Pricings.csv`) with per-token pricing for 79+ models across all providers.
- **Scalable Architecture**: Built with Node.js and Express 5, designed for easy provider extension via the factory pattern.

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Runtime** | [Node.js](https://nodejs.org/) (v16+) |
| **Framework** | [Express.js v5](https://expressjs.com/) |
| **Database / Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| **AI SDKs** | `openai` (OpenAI, Gemini & DeepSeek via compatibility layer), `@anthropic-ai/sdk` |
| **Utilities** | `dotenv` (env config), `nodemon` (dev hot-reload) |

## 📋 Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (v16 or higher) & npm
- A [Supabase](https://supabase.com/) project with the following tables configured:
  - `Users` — user records with `User_name` column
  - `API_Keys` — stores generated keys with `API_key` and `User_name` columns
  - `pricing` — model pricing with `provider`, `model`, and `price_per_token` columns
  - `api_usage` — usage logs with `api_key`, `provider`, `model`, `input_tokens`, `output_tokens`, `total_tokens`, and `price` columns
- API Keys for the providers you intend to use:
  - [OpenAI API Key](https://platform.openai.com/api-keys)
  - [Google Gemini API Key](https://makersuite.google.com/app/apikey)
  - [Anthropic API Key](https://console.anthropic.com/settings/keys)
  - [DeepSeek API Key](https://platform.deepseek.com/api_keys)

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
    Create a `.env` file in the root directory:
    ```env
    PORT=3000

    # AI Provider Keys
    OPENAI_API_KEY=your_openai_api_key_here
    GEMINI_API_KEY=your_gemini_api_key_here
    ANTHROPIC_API_KEY=your_anthropic_api_key_here
    DEEPSEEK_API_KEY=your_deepseek_api_key_here

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

All endpoints require authentication headers. See the **Authentication** section below for details.

---

### Chat — `/api/layers`

#### `POST /api/layers/chat`
Send a message to any supported LLM provider.

**Headers:**
| Header | Required | Description |
|---|---|---|
| `user` | ✅ | Your registered username |
| `api-key` | ✅ | A valid API key generated for your account |

**Request Body:**
```json
{
  "providerName": "openai",
  "model_name": "gpt-4o",
  "message": "Hello, how are you?"
}
```

**Supported Providers:** `openai`, `gemini`, `anthropic`, `deepseek`

**Response:**
```json
{
  "content": "I'm doing great! How can I help you today?",
  "usage": {
    "inputTokens": 12,
    "outputTokens": 15,
    "totalTokens": 27
  }
}
```

> **Note:** Usage is automatically logged to the `api_usage` table with price calculation after every successful request.

---

### API Key Management — `/api/keys`
Manage API keys for accessing the service. These endpoints require a valid `user` header.

#### `GET /api/keys/list`
Retrieve all API keys associated with the authenticated user.

#### `POST /api/keys/generate`
Generate a new API key for the authenticated user.

#### `DELETE /api/keys/delete`
Revoke an existing API key.

**Request Body:**
```json
{
  "key": "your_api_key_to_delete"
}
```

---

### Usage & Billing — `/api/usage`

#### `GET /api/usage/check`
Get aggregated usage statistics and the calculated bill for the authenticated user.

**Headers:**
| Header | Required | Description |
|---|---|---|
| `user` | ✅ | Your registered username |
| `api-key` | ✅ | A valid API key |

**Response:**
```json
{
  "priceToPay": {
    "username": "john_doe",
    "total_input_tokens": 15240,
    "total_output_tokens": 8320,
    "total_tokens": 23560,
    "base_price": 0.029450,
    "commission_5_percent": 0.001473,
    "final_price": 0.030923
  }
}
```

## 🔐 Authentication

The API uses two levels of middleware:

| Middleware | Used By | Validates |
|---|---|---|
| `auth.middleware.js` | Chat, Usage | `user` header (against `Users` table) **+** `api-key` header (against `API_Keys` table) |
| `authForKeys.middleware.js` | Key management | `user` header only (against `Users` table) |

## 💰 Pricing & Billing

The billing system works in three steps:

1. **Per-Request Price Calculation** (`priceCal.logistics.js`): After each chat request, the system looks up the per-token price from the `pricing` table for the given provider/model and logs the usage with the calculated cost.
2. **Aggregated Billing** (`finalPrice.logistics.js`): When a user checks their usage, all usage records across all their API keys are summed up, and a **5% commission** is applied on top of the base price.
3. **Model Pricing Reference**: The `Token-Prices/Model_Pricings.csv` file contains per-token pricing for **79 models** across all four providers, which can be used to seed the `pricing` table.

## 📂 Project Structure

```
├── Token-Prices/
│   └── Model_Pricings.csv      # Reference pricing data for 79+ models
├── src/
│   ├── controller/
│   │   ├── chat.controller.js   # Chat request handler
│   │   ├── keys.controller.js   # API key CRUD handler
│   │   └── usage.controller.js  # Usage & billing handler
│   ├── logistics/
│   │   ├── priceCal.logistics.js    # Per-request price calculation & usage logging
│   │   └── finalPrice.logistics.js  # Aggregated billing with commission
│   ├── middleware/
│   │   ├── auth.middleware.js        # User + API Key validation
│   │   ├── authForKeys.middleware.js # User-only validation
│   │   └── error.middleware.js       # Global error handler
│   ├── model/
│   │   ├── dbClient.js          # Database client setup
│   │   └── supabaseClient.js    # Supabase client initialization
│   ├── provider/
│   │   ├── openai.provider.js       # OpenAI integration
│   │   ├── gemini.provider.js       # Google Gemini integration (via OpenAI compat)
│   │   ├── anthropic.provider.js    # Anthropic Claude integration
│   │   ├── deepseek.provider.js     # DeepSeek integration (via OpenAI compat)
│   │   └── providerManager.provider.js  # Provider factory / registry
│   ├── routes/
│   │   ├── chat.routes.js       # /api/layers/* routes
│   │   ├── keys.routes.js       # /api/keys/* routes
│   │   └── usage.routes.js      # /api/usage/* routes
│   ├── services/
│   │   ├── chat.services.js         # Chat business logic + usage logging
│   │   └── generateKey.services.js  # API key generation logic
│   ├── app.js                   # Express app setup & route mounting
│   └── index.js                 # Server entry point
├── .env                         # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.
