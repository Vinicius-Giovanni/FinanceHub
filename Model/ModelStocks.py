from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


def to_camel(value: str) -> str:
    parts = value.split("_")

    return parts[0] + "".join(
        part.capitalize()
        for part in parts[1:]
    )


class Stock(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    average_daily_volume_10_day: float | None = None
    average_daily_volume_3_month: float | None = None

    currency: str
    earnings_per_share: float | None = None

    fifty_two_week_high: float | None = None
    fifty_two_week_high_change: float | None = None
    fifty_two_week_high_change_percent: float | None = None

    fifty_two_week_low: float | None = None
    fifty_two_week_low_change: float | None = None
    fifty_two_week_range: str | None = None

    logourl: str | None = None

    long_name: str | None = None
    market_cap: float | None = None
    price_earnings: float | None = None

    regular_market_change: float | None = None
    regular_market_change_percent: float | None = None
    regular_market_day_high: float | None = None
    regular_market_day_low: float | None = None
    regular_market_day_range: str | None = None
    regular_market_open: float | None = None
    regular_market_previous_close: float | None = None
    regular_market_price: float | None = None
    regular_market_time: datetime | None = None
    regular_market_volume: float | None = None

    short_name: str | None = None
    symbol: str

    two_hundred_day_average: float | None = None
    two_hundred_day_average_change: float | None = None
    two_hundred_day_average_change_percent: float | None = None

    used_interval: str | None = None
    used_range: str | None = None


class StockResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

    requested_at: datetime
    results: list[Stock]
    took: int
    guidance: str | None = None