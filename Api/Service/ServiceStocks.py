import asyncio
from brapi import AsyncBrapi

class StockService:

    def __init__(self, client: AsyncBrapi):
        self.client = client

    async def get_quotes(self, tickers: str):
        """
        Retorna as cotações dos tickers informados.

        Exemplo:
            tickers="PETR4"
            tickers="PETR4, VALE3, ITUB4"
        """

        quotes = await self.client.quote.retrieve(
            tickers=tickers
        )

        return quotes