import requests

from Backend.Settings.config import TWELVE_TOKEN, TWELVE_URL

class TwelveDataClient:
    """
    Cliente HTTP para comunicação com a API Twelve Data.
    """

    def __init__(self):
        self.base_url = TWELVE_URL

        self.session = requests.Session()

        self.session.headers.update({
            "Authorization": f"apikey {TWELVE_TOKEN}"
        })

    def get(self, endpoint: str, **kwargs):
        """
        Realiza uma requisição GET para a API Twelve Data.
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