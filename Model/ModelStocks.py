from datetime import datetime

from pydantic import BaseModel, ConfigDict


def to_camel(value: str) -> str:
    """
    Converte uma string no formato snake_case para camelCase.
    """
    parts = value.split("_")

    return parts[0] + "".join(
        part.capitalize()
        for part in parts[1:]
    )


class StockData(BaseModel):
    """
    Representa os dados de mercado de uma ação retornados pela Brapi.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    short_name: str | None = None
    long_name: str | None = None

    currency: str | None = None

    regular_market_price: float | None = None
    regular_market_day_high: float | None = None
    regular_market_day_low: float | None = None
    regular_market_day_range: str | None = None

    regular_market_change: float | None = None
    regular_market_change_percent: float | None = None

    regular_market_time: datetime | None = None

    market_cap: float | None = None
    regular_market_volume: float | None = None

    regular_market_previous_close: float | None = None
    regular_market_open: float | None = None

    fifty_two_week_range: str | None = None
    fifty_two_week_low: float | None = None
    fifty_two_week_high: float | None = None

    logourl: str | None = None


class Stock(BaseModel):
    """
    Representa o resultado de uma ação retornado pela Brapi.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    requested_symbol: str
    symbol: str
    changed: bool

    data: StockData


class StockResponse(BaseModel):
    """
    Representa a resposta da API de cotações da Brapi.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    requested_at: datetime
    results: list[Stock]
    took: int
    guidance: str | None = None