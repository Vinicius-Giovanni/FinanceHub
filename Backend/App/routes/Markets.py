from fastapi import APIRouter, Request

from Backend.Api.Service.ServiceMarkets import AlternativeService
from Backend.Model.ModelMarkets import FearAndGreedResponse

router = APIRouter(
    prefix="/api/markets",
    tags=["Markets"]
)

@router.get("/fear-greed", response_model=FearAndGreedResponse)
def get_fear_and_greed(
    request: Request,
    limit: int = 1,
):
    """
    Retorna o Fear and Greed Index.

    Por padrão, retorna o índice atual.
    """

    service = FearAndGreedResponse(
        request.app.state.alternative
    )

    return service.get_index(
        limit=limit
    )