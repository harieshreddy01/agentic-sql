from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import connect, schema_api, generate_sql, run_query

app = FastAPI(title="MySQL Agentic Copilot - MVP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(connect.router, prefix="/api")
app.include_router(schema_api.router, prefix="/api")
app.include_router(generate_sql.router, prefix="/api")
app.include_router(run_query.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "MySQL Agentic Copilot Backend Running"}


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        content={"error": str(exc)},
        status_code=500,
    )
