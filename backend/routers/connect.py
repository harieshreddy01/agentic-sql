from fastapi import APIRouter
from db.connection import db_manager
from models.request_models import ConnectRequest
from models.response_models import ConnectResponse

router = APIRouter(tags=["connection"])


@router.post("/connect", response_model=ConnectResponse)
def connect_db(req: ConnectRequest):
    result = db_manager.connect(req.host, req.user, req.password, req.database)
    if result is True:
        return ConnectResponse(success=True, message="Connected successfully.")
    return ConnectResponse(success=False, message=str(result))
