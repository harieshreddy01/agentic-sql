from fastapi import APIRouter
from db.schema import get_schema
from models.request_models import NLQueryRequest
from models.response_models import SQLResponse
from services.llm_service import generate_sql_from_nl

router = APIRouter(tags=["nl-to-sql"])


@router.post("/generate-sql", response_model=SQLResponse)
def generate_sql(req: NLQueryRequest):
    schema = get_schema()
    sql = generate_sql_from_nl(req.nl_query, schema)
    return SQLResponse(sql=sql)
