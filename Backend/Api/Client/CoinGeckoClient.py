import requests

from Backend.Settings.config import COINGECKO_TOKEN, COINGECKO_URL

class CoinGeckoClient:
    """
    CLiente HTTP para comunicação com a API CoinGecko
    """

    def __init__(self):
        self.base_url = COINGECKO_URL

        self.session = requests.Session()

        self.session.headers.update({
            "x-cg-demo-api-key": COINGECKO_TOKEN
        })

    def get(self, endpoint: str, **kwargs):
        """
        Realiza uma requisição GET para a API CoinGecko.
        """
        return self.session.get(
            f"{self.base_url}{endpoint}",
            **kwargs
        )

    def close(self):
        """
        Encerra a sessão HTTP.
        """
        self.session.close()