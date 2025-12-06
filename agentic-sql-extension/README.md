# Agentic SQL Extension

A VS Code extension that provides an AI-powered SQL generation interface with persistent chat history and database connection management.

## Features

* **Activity Bar Integration**: Database icon in the activity bar for quick access
* **Sidebar Panel**: Dedicated sidebar with two main sections:
  - DB Connection management
  - AI Chat interface
* **AI-Powered Chat**: Interactive chat interface to generate SQL queries
  - Send natural language requests to generate SQL
  - Persistent chat history across sessions
  - Message bubble UI (user messages on right, bot responses on left)
  - Clear chat history option
* **API Integration**: Connects to a configurable backend API endpoint
* **Persistent Storage**: Chat history is saved and restored automatically

## Requirements

* VS Code version 1.106.1 or higher
* Backend API server running (default: `http://localhost:8000`)
* Backend must have `/api/generate-sql` endpoint that accepts POST requests

## Extension Settings

This extension contributes the following settings:

* `agenticSql.baseUrl`: Base URL for the API server (default: `http://localhost:8000`)

### How to Configure

**Option 1: VS Code Settings UI**
1. Open Settings (Ctrl+, or Cmd+,)
2. Search for "Agentic SQL"
3. Update the "Base Url" field

**Option 2: settings.json**
```json
{
  "agenticSql.baseUrl": "http://your-api-url:port"
}
```

## Usage

1. Click the database icon in the activity bar
2. Navigate to the Chat section in the sidebar
3. Type your natural language query in the input box
4. Press Enter or click Send
5. View the generated SQL in the response bubble
6. Click "Clear Chat History" to reset the conversation

## API Contract

The extension expects the backend API to:

**Endpoint**: `POST /api/generate-sql`

**Request Body**:
```json
{
  "message": "your natural language query"
}
```

**Response**: JSON object (structure depends on your implementation)

If the server is unreachable, the extension displays "No response received".

## Development

### Project Structure
```
src/
├── extension.ts      # Extension activation and registration
├── treeView.ts       # Tree view provider for sidebar
└── chatView.ts       # Chat webview provider with API integration
```

### Building
```bash
npm install
npm run compile
```

### Running
Press `F5` to open a new VS Code window with the extension loaded.

### Debugging
- Set breakpoints in TypeScript files
- Use `console.log()` statements (output appears in Debug Console)
- Check the Developer Tools (Help > Toggle Developer Tools)

## Known Issues

* Chat history is stored globally (not per workspace)
* No authentication support for API requests yet

## Release Notes

### 0.0.1

Initial release:
- Activity bar icon with sidebar
- AI chat interface with persistent history
- Configurable API endpoint
- Clear chat history functionality

---

**Enjoy!**
