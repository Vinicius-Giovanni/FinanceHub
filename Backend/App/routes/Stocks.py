from fastapi import APIRouter, Request

from Backend.Api.Service.ServiceStocks import StockService
from Backend.Model.ModelStocks import QuoteResponse, HistoricalResponse

router = APIRouter(
    prefix="/api/stocks",
    tags=['Stocks']
)

@router.get("/quote", response_model=QuoteResponse)
def get_quotes(request: Request, tickers: str):
    """
    Params:
        tickers: Simbolos das ações
    Exemplas:
    PETR4, AAPL, VALE3
    """
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
    Params:
        symbols das ações: PETR4, AAPL, VALE3
        range permitidos: 1d, 5d, 1mo, 3mo
        interval, ele retorna um padrão de intervalo mas você pode inputar: 5m, 15m, 30m, 1h, 1d, 5d, 1wk, 1mo, 3mo
        sort_order, ordem da organização: asc, desc
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