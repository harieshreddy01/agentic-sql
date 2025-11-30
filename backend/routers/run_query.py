from fastapi import APIRouter
from db.connection import db_manager
from models.request_models import SQLQueryRequest
from models.response_models import QueryResultResponse
from services.sql_safety import is_safe_sql
import time

router = APIRouter(tags=["query"])


@router.post("/run-query", response_model=QueryResultResponse)
def run_query(req: SQLQueryRequest):
    sql = req.sql

    if not is_safe_sql(sql):
        raise ValueError("Unsafe SQL query detected. Only SELECT queries are allowed.")

    conn = db_manager.get_connection()
    if conn is None:
        raise RuntimeError("No active database connection. Call /connect first.")

    cursor = conn.cursor()

    start = time.time()
    cursor.execute(sql)
    result = cursor.fetchall()
    end = time.time()

    columns = [desc[0] for desc in cursor.description]
    cursor.close()

    return QueryResultResponse(
        rows=result,
        columns=columns,
        execution_time=end - start,
    )
