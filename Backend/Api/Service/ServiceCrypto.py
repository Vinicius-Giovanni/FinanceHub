from Backend.Api.Client.CoinGeckoClient import CoinGeckoClient

class CryptoService:

    def __init__(self, client: CoinGeckoClient):
        self.client = client

    def get_prices(
            self,
            ids: str,
            vs_currencies: str = "usd"
    ):
        """
        Retorna os preços atuais das criptomoedas informadas.
        """

        response = self.client.get(
            "simple/price",
            params={
                "ids": ids,
                "vs_currencies": vs_currencies
            }
        )

        response.raise_for_status()

        return response.json()

    def get_historical(
            self,
            coin_id: str,
            days: int | str = 30,
            vs_currency: str = "usd",
    ):
        """
        Retorna o hitórico de preços de uma criptomoeda.
        """

        response = self.client.get(
            f"coins/{coin_id}/market_chart",
            params={
                "vs_currency": vs_currency,
                "days": days
            }
        )

        response.raise_for_status()

        return response.json()