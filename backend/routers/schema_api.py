from fastapi import APIRouter
from db.schema import get_schema
from models.response_models import SchemaResponse

router = APIRouter(tags=["schema"])


@router.get("/schema", response_model=SchemaResponse)
def fetch_schema():
    schema = get_schema()
    return SchemaResponse(schema=schema)
