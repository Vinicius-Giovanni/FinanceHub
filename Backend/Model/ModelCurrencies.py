from datetime import datetime

from pydantic import BaseModel, ConfigDict

from Backend.utils.utils import to_camel

class FiftyTwoWeek(BaseModel):
    """
    Representa os dados de variação do par de moedas
    nas últimas 52 semanas.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    low: float | None = None
    high: float | None = None

    low_change: float | None = None
    high_change: float | None = None

    low_change_percent: float | None = None
    high_change_percent: float | None = None

    range: str | None = None


class CurrencyQuoteResponse(BaseModel):
    """
    Representa a cotação atual de um par de moedas
    retornada pela Twelve Data.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    symbol: str
    name: str
    exchange: str

    datetime: str
    timestamp: int
    last_quote_at: int

    open: float | None = None
    high: float | None = None
    low: float | None = None
    close: float | None = None
    previous_close: float | None = None

    change: float | None = None
    percent_change: float | None = None

    is_market_open: bool

    fifty_two_week: FiftyTwoWeek | None = None

class CurrencyHistoricalMeta(BaseModel):
    """
    Representa os metadados do histórico de um par de moedas.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    symbol: str
    interval: str
    currency_base: str
    currency_quote: str
    type: str


class CurrencyHistoricalValue(BaseModel):
    """
    Representa um ponto histórico de um par de moedas.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    datetime: str

    open: float | None = None
    high: float | None = None
    low: float | None = None
    close: float | None = None


class CurrencyHistoricalResponse(BaseModel):
    """
    Representa o histórico de um par de moedas
    retornado pela Twelve Data.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    meta: CurrencyHistoricalMeta
    values: list[CurrencyHistoricalValue]

    status: str