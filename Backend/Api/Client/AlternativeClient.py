import requests

from Backend.Settings.config import ALTERNATIVE_URL

class AlternativeClient:
    """
    Cliente HTTP para comunicação com a API Alternative.me.
    """

    def __init__(self):
        self.base_url = ALTERNATIVE_URL

        self.session = requests.Session()

    def get(self, endpoint: str, **kwargs):
        """
        Realiza uma requisição GET para a API Alternative.me.
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