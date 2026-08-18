from fastapi import APIRouter, Request

from Backend.Api.Service.ServiceCurrencies import CurrencyService
from Backend.Model.ModelCurrencies import CurrencyQuoteResponse, CurrencyHistoricalResponse

router = APIRouter(
    prefix="/api/currencies",
    tags=["Currencies"]
)

@router.get("/quote", response_model=CurrencyQuoteResponse)
def get_quote(
    request: Request,
    symbol: str,
):
    """
    Retorna a cotação atual do par de moedas informado.

    Exemplo:
    /api/currencies/quote?symbol=USD/BRL
    """

    service = CurrencyService(
        request.app.state.twelve_data
    )

    return service.get_quote(
        symbol=symbol
    )

@router.get("/historical", response_model=CurrencyHistoricalResponse)
def get_historical(
    request: Request,
    symbol: str,
    interval: str = "1day",
    outputsize: int = 30,
):
    """
    Retorna o histórico de cotações do par de moedas informado.

    Exemplo de interval:
    1min, 5min, 15min, 30min, 45min,
    1h, 2h, 4h, 8h,
    1day, 1week, 1month

    outputsize: dias de histórico retornado: 1 , 30, 60, 90
    """

    service = CurrencyService(
        request.app.state.twelve_data
    )

    return service.get_historical(
        symbol=symbol,
        interval=interval,
        outputsize=outputsize,
    )
