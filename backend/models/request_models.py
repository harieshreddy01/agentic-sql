from pydantic import BaseModel


class ConnectRequest(BaseModel):
    host: str
    user: str
    password: str
    database: str


class NLQueryRequest(BaseModel):
    nl_query: str


class SQLQueryRequest(BaseModel):
    sql: str
