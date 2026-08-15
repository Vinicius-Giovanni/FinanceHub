import requests

from Backend.Api.Client.BrapiClient import BrapiClient
class StockService:

    def __init__(self, client: BrapiClient):
        self.client = client

    def get_quotes(self, tickers: str):
        """
        Retorna as cotações dos ativos informados
        """

        response = self.client.get(
            "quotes",
            tickers)

        response.raise_for_status()

        return response.json()

    def get_historical(self,
                   symbols: str,
                   range: str | None = None,
                   interval: str | None = None,
                   sort_order: str | None = None):

        response = self.client.get(
            "historical",
            params={
                "symbols": symbols,
                "range":range,
                "interval": interval,
                "sortOrder": sort_order
            }
        )

        response.raise_for_status()

        return response.json()
