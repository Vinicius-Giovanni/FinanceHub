from fastapi import APIRouter, Request

from Backend.Api.Service.ServiceStocks import StockService
from Backend.Model.ModelStocks import QuoteResponse, HistoricalResponse

router = APIRouter(
    prefix="/api/stocks",
    tags=['Stocks']
)

@router.get("/quote", response_model=QuoteResponse)
def get_quotes(request: Request, tickers: str):

    service = StockService(
        request.app.state.brapi
    )

    return service.get_quotes(tickers)

@router.get("/historical", response_model=HistoricalResponse)
def get_historical(
    request: Request,
    symbols: str,
    range: str | None = None,
    interval: str | None = None,
    sort_order: str | None = None,
):
    """
    Ranges permitidos: 1d, 5d, 1mo, 3mo
    """
    service = StockService(
        request.app.state.brapi
    )

    return service.get_historical(
        symbols=symbols,
        range=range,
        interval=interval,
        sort_order=sort_order
    )