from fastapi import APIRouter, Request

from  Backend.Api.Service.ServiceCrypto import CryptoService
from Backend.Model.ModelCrypto import CryptoPriceResponse, HistoricalResponse

router = APIRouter(
    prefix="/api/crypto",
    tags=["Crypto"]
)

@router.get("/price", response_model=CryptoPriceResponse)
def get_prices(
    request: Request,
    ids: str,
    vs_currencies: str = "usd"
):
    """
    Retorna os preços das criptomoedas informadas.

    Exemplo:
    /api/crypto/prices?ids=bitcoin,ethereum&vs_currencies=usd,brl
    """

    service = CryptoService(
        request.app.state.coingecko
    )

    return service.get_prices(
        ids=ids,
        vs_currencies=vs_currencies
    )

@router.get("/historical", response_model=HistoricalResponse)
def get_historical(
    request: Request,
    coin_id: str,
    days: int | str = 30,
    vs_currency: str = "usd",
):
    """
    Retorna o histórico de preço de uma criptomoeda.
    A granularidade é definida automaticamente pela CoinGecko
    de acordo como período informado.
    """

    service = CryptoService(
        request.app.state.coingecko
    )

    return service.get_historical(
        coin_id=coin_id,
        days=days,
        vs_currency=vs_currency,
    )