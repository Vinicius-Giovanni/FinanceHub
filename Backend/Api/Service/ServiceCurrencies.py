from Backend.Api.Client.TwelveClient import TwelveDataClient

class CurrencyService:

    def __init__(self, client: TwelveDataClient):
        self.client = client

    def get_quote(self, symbol: str):
        """
        Retorna a cotação atual do par de moedas informado.
        """

        response = self.client.get(
            "quote",
            params={
                "symbol": symbol
            }
        )

        response.raise_for_status()

        return response.json()

    def get_historical(
            self,
            symbol: str,
            interval: str = "1day",
            outputsize: int = 30
    ):
        """
        Retorna o histórico de cotações do par de moedas informado.
        """

        response = self.client.get(
            "time_series",
            params={
                "symbol": symbol,
                "interval": interval,
                "outputsize": outputsize
            }
        )

        response.raise_for_status()

        return response.json()