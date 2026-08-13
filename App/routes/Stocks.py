from fastapi import APIRouter, Request

from Api.Service.ServiceStocks import StockService
from Model.ModelStocks import StockResponse

router = APIRouter(
    prefix="/api/stocks",
    tags=['Stocks']
)

@router.get("/quote", response_model=StockResponse)
def get_quotes(request: Request, tickers: str):

    service = StockService(
        request.app.state.brapi
    )

    return service.get_quotes(tickers)