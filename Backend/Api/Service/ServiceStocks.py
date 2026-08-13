import requests
class StockService:

    def __init__(self, client: requests.Session):
        self.client = client

    def get_quotes(self, tickers: str):
        """
        Retorna as cotações dos ativos informados
        """

        response = self.client.get(
            "https://brapi.dev/api/v2/stocks/quote",
            params={
                "symbols": tickers
            }
        )

        response.raise_for_status()

        return response.json()

    def get_historical(self,
                   symbols: str,
                   range: str | None = None,
                   interval: str | None = None,
                   sort_order: str | None = None):

        response = self.client.get(
            "https://brapi.dev/api/v2/stocks/historical",
            params={
                "symbols": symbols,
                "range":range,
                "interval": interval,
                "sortOrder": sort_order
            }
        )

        response.raise_for_status()

        return response.json()
