# MySQL Agentic Copilot

An advanced MySQL Copilot that evolves from simple NL → SQL into a schema-aware, self-correcting, agentic system with performance insights and optional VS Code integration.

This repository is organized into **phases**:

- **Phase 1 (MVP)** – Backend with NL → SQL, schema introspection, and safe query execution (implemented in `backend/`).
- **Phase 2 (Agentic)** – Tool-based agent (schema, run, explain, self-correct).
- **Phase 3 (Differentiator)** – Query performance optimization engine and/or SQL dialect migration + VS Code integration.

## Structure

```text
mysql-agentic-copilot/
│── backend/          # FastAPI backend (Phase 1 complete)
│── README.md         # Project-level documentation
```

## Running the Backend (Phase 1)

See `backend/README.md` for detailed steps.

Quick start:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
# Add your OpenAI key in .env
uvicorn main:app --reload
```

API docs: http://127.0.0.1:8000/docs

## Docker Usage

A `Dockerfile` is provided in `backend/` and `docker-compose.yml` in the root.

To build and run with Docker:

```bash
docker compose up --build
```

This will spin up:

- `backend` service on port 8000
- (You can later add a `mysql` service for local DB if needed.)

## Roadmap

- [x] Phase 1 – MVP backend
- [ ] Phase 2 – Agentic execution & self-correction
- [ ] Phase 3 – Performance analysis & VS Code integration
