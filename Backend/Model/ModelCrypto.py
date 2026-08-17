from pydantic import BaseModel, ConfigDict, RootModel

from Backend.utils.utils import to_camel

class CryptoPriceData(BaseModel):
    """
    Representa os dados de preço de uma criptomoeda
    retornados pela API CoinGecko.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    usd: float | None = None
    usd_market_cap: float | None = None
    usd_24h_vol: float | None = None
    usd_24h_change: float | None = None

    brl: float | None = None
    brl_market_cap: float | None = None
    brl_24h_vol: float | None = None
    brl_24h_change: float | None = None


class CryptoPriceResponse(RootModel[dict[str, CryptoPriceData]]):
    """
    Representa a resposta de preços da API CoinGecko.

    A chave do dicionário corresponde ao ID da criptomoeda.
    """


class HistoricalPoint(BaseModel):
    """
    Representa um ponto histórico de uma criptomoeda.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    timestamp: int
    value: float


class HistoricalResponse(BaseModel):
    """
    Representa o histórico de preços de uma criptomoeda
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    prices: list[HistoricalPoint]