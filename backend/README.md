# MySQL Agentic Copilot — Backend (Phase 1 MVP)

This backend implements the **Phase 1 (MVP)** of the MySQL Agentic Copilot project.

## Features in Phase 1

- FastAPI backend
- MySQL connection API (`/api/connect`)
- Schema introspection (`/api/schema`)
- Natural Language → SQL generation using OpenAI (`/api/generate-sql`)
- Safe SELECT query execution (`/api/run-query`)
- SQL safety filter (blocks destructive operations)
- Structured code layout (db, routers, services, models)


## Setup Instructions

### 1. Create virtual environment (optional but recommended)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and set your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run FastAPI server

```bash
uvicorn main:app --reload
```

Server will be available at: `http://127.0.0.1:8000`

FastAPI docs at: `http://127.0.0.1:8000/docs`


## API Endpoints

### POST `/api/connect`

Connect to a MySQL database.

Request body:

```json
{
  "host": "localhost",
  "user": "root",
  "password": "password",
  "database": "your_database"
}
```


### GET `/api/schema`

Returns the database schema (tables and columns).


### POST `/api/generate-sql`

Generate a SQL query from natural language.

Request body:

```json
{
  "nl_query": "Show total salary per department"
}
```


### POST `/api/run-query`

Execute a **safe SELECT** SQL query.

Request body:

```json
{
  "sql": "SELECT * FROM employees LIMIT 10"
}
```


## Folder Structure (Backend)

```text
backend/
│── main.py
│── requirements.txt
│── .env.example
│── db/
│   ├── connection.py
│   └── schema.py
│── routers/
│   ├── connect.py
│   ├── schema_api.py
│   ├── generate_sql.py
│   └── run_query.py
│── services/
│   ├── llm_service.py
│   └── sql_safety.py
│── models/
│   ├── request_models.py
│   └── response_models.py
│── tests/
│── postman/
└── README.md
```

## Next Phases

- Phase 2: Agentic tools (schema/run/explain + self-correction)
- Phase 3: Performance optimization + VS Code extension

