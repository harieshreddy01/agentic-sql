from pydantic import BaseModel
from typing import List, Any, Dict


class ConnectResponse(BaseModel):
    success: bool
    message: str


class SchemaResponse(BaseModel):
    schema: Dict[str, Any]


class SQLResponse(BaseModel):
    sql: str


class QueryResultResponse(BaseModel):
    rows: List[List[Any]]
    columns: List[str]
    execution_time: float
